import { WAVES } from './waves.js'
import { createEnemy, createBullet, createParticle, createRing } from './entities.js'
import {
  clearCanvas, drawStars, drawPlayer, drawPlayerGlow,
  drawEnemy, drawBullet, drawParticle, drawRing,
} from './renderer.js'
import { recalibrate, stopControls } from './controls.js'

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function dist2(a, b) {
  const dx = a.x - b.x, dy = a.y - b.y
  return dx * dx + dy * dy
}
function randSpread(s) { return (Math.random() - 0.5) * 2 * s }

function initStars(w, h) {
  return Array.from({ length: 160 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    sz: 0.5 + Math.random() * 1.5,
    speed: 0.2 + Math.random() * 0.5,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.02 + Math.random() * 0.03,
  }))
}

function spawnAtEdge(W, H) {
  const edge = Math.floor(Math.random() * 4)
  if (edge === 0) return { x: Math.random() * W, y: -50 }
  if (edge === 1) return { x: W + 50, y: Math.random() * H }
  if (edge === 2) return { x: Math.random() * W, y: H + 50 }
  return { x: -50, y: Math.random() * H }
}

export function createEngine({ bgCanvas, gameCanvas, store }) {
  // Private state — never in Zustand
  let px, py, vx, vy
  let enemies = [], bullets = [], particles = [], rings = []
  let waveKills = 0, spawnTimer = 0
  let betweenWaves = false, betweenTimer = 0
  let wave = 1
  let score = 0, health = 100, force = 0, combo = 0, comboTimer = 0
  let statsTimer = 0
  let stars = []
  let lastT = 0, rafId = null, running = false

  function W() { return gameCanvas.width }
  function H() { return gameCanvas.height }

  function resizeCanvases() {
    const w = window.innerWidth, h = window.innerHeight
    bgCanvas.width = gameCanvas.width = w
    bgCanvas.height = gameCanvas.height = h
  }

  function pushStats(force_push = false) {
    if (force_push || statsTimer <= 0) {
      store().updateStats({ score, health, force: Math.floor(force), wave, combo })
      statsTimer = 100
    }
  }

  function sideColorVal() {
    return store().side === 'jedi' ? '#00BFFF' : '#FF1744'
  }

  function killEnemy(e, golden = false) {
    score += e.pts
    force = Math.min(100, force + 13)
    comboTimer = 2200
    combo++
    const color = golden ? '#FFD700' : sideColorVal()
    const count = golden ? 14 : 9
    for (let i = 0; i < count; i++) {
      particles.push(createParticle({ x: e.x, y: e.y, color }))
    }
  }

  function playerHit(dmg) {
    health = Math.max(0, health - dmg)
    for (let i = 0; i < 5; i++) {
      particles.push(createParticle({ x: px, y: py, color: '#FF4444' }))
    }
    if (health <= 0) endGame('lose')
  }

  function endGame(result) {
    running = false
    pushStats(true)
    store().setResult(result)
    store().setScreen('end')
    cancelAnimationFrame(rafId)
  }

  function processTap(clientX, clientY) {
    const rect = gameCanvas.getBoundingClientRect()
    const tx = clientX - rect.left
    const ty = clientY - rect.top

    if (force >= 100) {
      // Force Blast
      const diag = Math.sqrt(W() * W() + H() * H())
      enemies.forEach(e => killEnemy(e, true))
      enemies = []
      rings.push(createRing({ x: W() / 2, y: H() / 2, maxR: diag, blast: true }))
      force = 0
      pushStats(true)
      return
    }

    // Deflect bullets in 130px radius
    let deflected = 0
    bullets.forEach(b => {
      if (!b.fromEnemy) return
      if (dist2(b, { x: tx, y: ty }) < 130 * 130) {
        b.vx = -b.vx * 1.2 + randSpread(0.5)
        b.vy = -b.vy * 1.2 + randSpread(0.5)
        b.fromEnemy = false
        b.fromPlayer = true
        b.color = sideColorVal()
        deflected++
      }
    })
    if (deflected > 0) {
      rings.push(createRing({ x: tx, y: ty, maxR: 120 }))
    }
  }

  function onDeflect(e) {
    e.detail.touches.forEach(t => processTap(t.clientX, t.clientY))
  }
  function onClick(e) {
    processTap(e.clientX, e.clientY)
  }

  function reset() {
    wave = 1
    px = W() / 2; py = H() / 2
    vx = 0; vy = 0
    enemies = []; bullets = []; particles = []; rings = []
    waveKills = 0; spawnTimer = 0
    betweenWaves = false; betweenTimer = 0
    score = 0; health = 100; force = 0; combo = 0; comboTimer = 0
    statsTimer = 0
    stars = initStars(W(), H())
    recalibrate()
    pushStats(true)
  }

  function update(dt) {
    const st = store()

    // Combo timeout
    if (comboTimer > 0) {
      comboTimer -= dt
      if (comboTimer <= 0) combo = 0
    }

    // Player movement
    vx += st.tiltX * 1.5
    vy += st.tiltY * 1.5
    vx *= 0.80
    vy *= 0.80
    px = clamp(px + vx, 24, W() - 24)
    py = clamp(py + vy, 24, H() - 24)

    if (betweenWaves) {
      betweenTimer -= dt
      if (betweenTimer <= 0) {
        betweenWaves = false
        wave++
        waveKills = 0
        spawnTimer = 0
        const isInfinite = store().mode === 'infinite'
        if (!isInfinite && wave > WAVES.length) {
          wave = WAVES.length
          endGame('win')
          return
        }
        pushStats(true)
      }
      updateParticles(dt)
      updateRings(dt)
      return
    }

    const wc = WAVES[Math.min(wave, WAVES.length) - 1]

    // Spawn enemies
    spawnTimer -= dt
    if (spawnTimer <= 0 && enemies.length < 9) {
      const { x, y } = spawnAtEdge(W(), H())
      enemies.push(createEnemy({
        x, y,
        speed: wc.speed,
        cx: W() / 2,
        cy: H() / 2,
        wave,
      }))
      spawnTimer = wc.spawnMs
    }

    // Update enemies
    enemies.forEach(e => {
      e.t += dt
      if (e.zig) {
        const cosT = Math.cos(e.t * 0.003) * 2.0
        e.x += e.vx + e.perp.x * cosT
        e.y += e.vy + e.perp.y * cosT
      } else {
        e.x += e.vx
        e.y += e.vy
      }
      // Enemy shoots
      e.shootTO -= dt
      if (e.shootTO <= 0) {
        const angle = Math.atan2(py - e.y, px - e.x) + randSpread(0.25)
        bullets.push(createBullet({
          x: e.x, y: e.y,
          angle,
          speed: wc.bSpeed,
          fromEnemy: true,
          side: st.side,
        }))
        e.shootTO = 1400 + Math.random() * 1400
      }
    })

    // Update bullets
    bullets = bullets.filter(b => {
      b.x += b.vx
      b.y += b.vy
      b.life -= dt
      return b.life > 0 && b.x > -30 && b.x < W() + 30 && b.y > -30 && b.y < H() + 30
    })

    // Collision: enemy reaches player
    enemies = enemies.filter(e => {
      if (dist2(e, { x: px, y: py }) < 28 * 28) {
        playerHit(14)
        return false
      }
      return true
    })

    // Collision: enemy bullet hits player
    bullets = bullets.filter(b => {
      if (b.fromEnemy && dist2(b, { x: px, y: py }) < 20 * 20) {
        playerHit(8)
        return false
      }
      return true
    })

    // Collision: player bullet hits enemies
    const hitBullets = new Set()
    enemies = enemies.filter(e => {
      let alive = true
      bullets.forEach((b, i) => {
        if (!b.fromPlayer) return
        if (dist2(b, e) < 26 * 26) {
          hitBullets.add(i)
          e.hp--
          if (e.hp <= 0) {
            killEnemy(e)
            waveKills++
            alive = false
          }
        }
      })
      return alive
    })
    bullets = bullets.filter((_, i) => !hitBullets.has(i))

    // Wave completion
    if (waveKills >= wc.target && !betweenWaves) {
      betweenWaves = true
      betweenTimer = 3000
      health = Math.min(100, health + 20)
      enemies = []
      bullets = []
      pushStats(true)
    }

    updateParticles(dt)
    updateRings(dt)
    statsTimer -= dt
    pushStats(false)
  }

  function updateParticles(dt) {
    particles = particles.filter(p => {
      p.x += p.vx; p.y += p.vy
      p.vx *= 0.93; p.vy *= 0.93
      p.life -= 0.035
      return p.life > 0
    })
  }

  function updateRings(dt) {
    rings = rings.filter(r => {
      r.r += (r.maxR - r.r) * 0.14
      r.life -= 0.035
      return r.life > 0
    })
  }

  function draw() {
    const bgCtx   = bgCanvas.getContext('2d')
    const gameCtx = gameCanvas.getContext('2d')
    const st = store()

    // Stars background
    clearCanvas(bgCtx, W(), H())
    bgCtx.fillStyle = '#03030f'
    bgCtx.fillRect(0, 0, W(), H())
    drawStars(bgCtx, stars, W(), H())

    // Game canvas
    clearCanvas(gameCtx, W(), H())
    drawPlayerGlow(gameCtx, { px, py, side: st.side })
    enemies.forEach(e => drawEnemy(gameCtx, e))
    bullets.forEach(b => drawBullet(gameCtx, b))
    rings.forEach(r => drawRing(gameCtx, r, st.side))
    particles.forEach(p => drawParticle(gameCtx, p))
    drawPlayer(gameCtx, { px, py, side: st.side })
  }

  function loop(t) {
    if (!running) return
    const dt = Math.min(t - lastT, 50)
    lastT = t
    update(dt)
    draw()
    rafId = requestAnimationFrame(loop)
  }

  return {
    start() {
      resizeCanvases()
      reset()
      running = true
      gameCanvas.addEventListener('deflect', onDeflect)
      gameCanvas.addEventListener('click', onClick)
      window.addEventListener('resize', resizeCanvases)
      rafId = requestAnimationFrame(t => { lastT = t; loop(t) })
    },
    stop() {
      running = false
      cancelAnimationFrame(rafId)
      gameCanvas.removeEventListener('deflect', onDeflect)
      gameCanvas.removeEventListener('click', onClick)
      window.removeEventListener('resize', resizeCanvases)
      stopControls()
    },
  }
}
