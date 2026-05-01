import { playSlash, playCut, playBomb, playLoseLife, playGameOver } from './audioEngine.js'

const EMOJI_FONT = "'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',serif"

const TYPES = [
  { emoji: '🤖', pts: 10, bomb: false },
  { emoji: '👾', pts: 20, bomb: false },
  { emoji: '🛸', pts: 15, bomb: false },
  { emoji: '💀', pts: 40, bomb: false },
  { emoji: '💣', pts:  0, bomb: true  },
]

function randBetween(a, b) { return a + Math.random() * (b - a) }
function randSpread(s)     { return (Math.random() - 0.5) * 2 * s }

function distPointSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy + 1e-9)))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

function initStars(w, h) {
  return Array.from({ length: 160 }, () => ({
    x: Math.random() * w, y: Math.random() * h,
    sz: 0.4 + Math.random() * 1.4,
    speed: 0.15 + Math.random() * 0.35,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.015 + Math.random() * 0.025,
  }))
}

export function createSlashEngine({ canvas, store }) {
  let objects = [], fragments = [], particles = [], rings = [], trail = []
  let lives = 3, score = 0, combo = 0, comboTimer = 0
  let spawnTimer = 0, statsTimer = 0
  let stars = [], rafId, running = false, lastT = 0
  let lastSlashSound = 0
  let timeLeft = 0, isMaestro = false

  function W() { return canvas.width }
  function H() { return canvas.height }
  function sideColor() { return store().side === 'jedi' ? '#00BFFF' : '#FF1744' }
  function difficulty() { return Math.min(8, score / 80) }
  function spawnInterval() { return Math.max(550, 2000 - difficulty() * 160) }

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }

  function pushStats(force = false) {
    if (force || statsTimer <= 0) {
      const healthVal = isMaestro ? Math.round((timeLeft / 60000) * 100) : lives * 34
      store().updateStats({ score, health: healthVal, force: isMaestro ? timeLeft / 600 : 0, wave: Math.ceil(difficulty() + 1), combo })
      statsTimer = 100
    }
  }

  function spawnObject() {
    const isBomb = Math.random() < 0.13
    const pool   = isBomb ? TYPES.filter(t => t.bomb) : TYPES.filter(t => !t.bomb)
    const type   = pool[Math.floor(Math.random() * pool.length)]
    const spd    = randBetween(2.5, 4 + difficulty() * 0.4)
    const edge   = Math.floor(Math.random() * 4)
    let x, y, vx, vy

    if (edge === 0) { x = randBetween(W() * .15, W() * .85); y = -55; vx = randSpread(2); vy = spd }
    else if (edge === 1) { x = W() + 55; y = randBetween(H() * .15, H() * .85); vx = -spd; vy = randSpread(2) }
    else if (edge === 2) { x = randBetween(W() * .15, W() * .85); y = H() + 55; vx = randSpread(2); vy = -spd }
    else { x = -55; y = randBetween(H() * .15, H() * .85); vx = spd; vy = randSpread(2) }

    return {
      x, y, vx, vy,
      emoji: type.emoji, pts: type.pts, bomb: type.bomb,
      sz: 38, rotation: Math.random() * Math.PI * 2,
      rotSpeed: randSpread(0.06),
      alive: true, id: Math.random(),
    }
  }

  function cutObject(obj, p1, p2) {
    obj.alive = false
    const color = sideColor()

    if (obj.bomb) {
      playBomb()
      if (isMaestro) {
        timeLeft = Math.max(0, timeLeft - 5000)
        pushStats(true)
        for (let i = 0; i < 18; i++) {
          particles.push({ x: obj.x, y: obj.y,
            vx: randSpread(7), vy: randSpread(7) - 1,
            color: '#FF1744', life: 1, sz: 2 + Math.random() * 4 })
        }
        rings.push({ x: obj.x, y: obj.y, r: 10, maxR: 90, life: 1, color: '#FF1744' })
        if (timeLeft <= 0) endGame()
      } else {
        lives = Math.max(0, lives - 1)
        pushStats(true)
        for (let i = 0; i < 18; i++) {
          particles.push({ x: obj.x, y: obj.y,
            vx: randSpread(7), vy: randSpread(7) - 1,
            color: '#FF1744', life: 1, sz: 2 + Math.random() * 4 })
        }
        rings.push({ x: obj.x, y: obj.y, r: 10, maxR: 90, life: 1, color: '#FF1744' })
        if (lives <= 0) endGame()
      }
      return
    }

    score += obj.pts * Math.max(1, combo)
    combo++
    comboTimer = 2000
    playCut(combo)
    pushStats(true)

    // slash angle for clipping
    const slashAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    const perpX = -Math.sin(slashAngle)
    const perpY =  Math.cos(slashAngle)
    const flySpd = randBetween(2, 4)

    for (const half of ['left', 'right']) {
      const sign = half === 'left' ? 1 : -1
      fragments.push({
        x: obj.x + perpX * sign * 4, y: obj.y + perpY * sign * 4,
        vx: perpX * sign * flySpd + randSpread(1),
        vy: perpY * sign * flySpd + randSpread(1) - 1,
        emoji: obj.emoji, sz: obj.sz,
        slashAngle, half,
        rotation: obj.rotation, rotSpeed: randSpread(0.07),
        life: 1,
      })
    }

    // bright ring at cut point
    rings.push({ x: obj.x, y: obj.y, r: 5, maxR: 55, life: 1, color })

    // small particles burst
    for (let i = 0; i < 8; i++) {
      particles.push({ x: obj.x, y: obj.y,
        vx: randSpread(5), vy: randSpread(5) - 1,
        color, life: 1, sz: 1.5 + Math.random() * 2.5 })
    }
  }

  function endGame() {
    running = false
    pushStats(true)
    playGameOver()
    store().setResult('lose')
    store().setScreen('end')
    cancelAnimationFrame(rafId)
  }

  // Called from SlashScreen on touch/mouse move
  function addTrailPoint(x, y, t) {
    trail.push({ x, y, t })
    if (t - lastSlashSound > 70) { playSlash(); lastSlashSound = t }
    if (trail.length < 2) return

    const prev = trail[trail.length - 2]
    const curr = trail[trail.length - 1]
    if (Math.hypot(curr.x - prev.x, curr.y - prev.y) < 6) return

    const toKill = []
    objects.forEach(obj => {
      if (!obj.alive) return
      if (distPointSeg(obj.x, obj.y, prev.x, prev.y, curr.x, curr.y) < obj.sz * 0.58) {
        toKill.push({ obj, p1: prev, p2: curr })
      }
    })
    toKill.forEach(({ obj, p1, p2 }) => cutObject(obj, p1, p2))
    objects = objects.filter(o => o.alive)
  }

  function update(dt) {
    if (comboTimer > 0) {
      comboTimer -= dt
      if (comboTimer <= 0) combo = 0
    }

    if (isMaestro) {
      timeLeft -= dt
      if (timeLeft <= 0) {
        timeLeft = 0
        endGame()
        return
      }
    }

    spawnTimer -= dt
    if (spawnTimer <= 0 && objects.length < 10) {
      objects.push(spawnObject())
      spawnTimer = spawnInterval()
    }

    // Objects
    objects = objects.filter(obj => {
      obj.x += obj.vx
      obj.y += obj.vy
      obj.vy += 0.04   // gravity
      obj.rotation += obj.rotSpeed
      const margin = 90
      if (obj.x < -margin || obj.x > W() + margin ||
          obj.y < -margin || obj.y > H() + margin) {
        if (!obj.bomb && !isMaestro) { lives = Math.max(0, lives - 1); playLoseLife(); pushStats(true) }
        if (!isMaestro && lives <= 0) endGame()
        return false
      }
      return obj.alive
    })

    // Fragments
    fragments = fragments.filter(f => {
      f.x += f.vx; f.y += f.vy
      f.vy += 0.06
      f.rotation += f.rotSpeed
      f.life -= 0.025
      return f.life > 0
    })

    // Particles
    particles = particles.filter(p => {
      p.x += p.vx; p.y += p.vy
      p.vx *= 0.91; p.vy *= 0.91
      p.life -= 0.038
      return p.life > 0
    })

    // Rings
    rings = rings.filter(r => {
      r.r += (r.maxR - r.r) * 0.18
      r.life -= 0.055
      return r.life > 0
    })

    // Stars
    stars.forEach(st => {
      st.y += st.speed
      st.twinkle += st.twinkleSpeed
      if (st.y > H()) { st.y = 0; st.x = Math.random() * W() }
    })

    // Purge old trail points
    const now = performance.now()
    trail = trail.filter(p => now - p.t < 220)

    statsTimer -= dt
    pushStats(false)
  }

  function draw() {
    const ctx = canvas.getContext('2d')
    const color = sideColor()

    // Background
    ctx.fillStyle = '#03030f'
    ctx.fillRect(0, 0, W(), H())

    // Stars
    stars.forEach(st => {
      ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(st.twinkle))
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(st.x, st.y, st.sz, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1

    // Objects
    objects.forEach(obj => {
      ctx.save()
      ctx.translate(obj.x, obj.y)
      if (obj.bomb) {
        // Subtle red glow on bombs
        ctx.shadowBlur = 12 + Math.sin(Date.now() * 0.008) * 6
        ctx.shadowColor = '#FF1744'
      }
      ctx.rotate(obj.rotation)
      ctx.font = `${obj.sz}px ${EMOJI_FONT}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(obj.emoji, 0, 0)
      ctx.shadowBlur = 0
      ctx.restore()
    })

    // Cut fragments (emoji halves, clipped by slash angle)
    fragments.forEach(f => {
      ctx.save()
      ctx.globalAlpha = Math.max(0, f.life)
      ctx.translate(f.x, f.y)
      ctx.rotate(f.slashAngle)
      ctx.beginPath()
      const sz = f.sz * 1.4
      if (f.half === 'left') ctx.rect(-sz, -sz, sz, sz * 2)
      else                   ctx.rect(0,   -sz, sz, sz * 2)
      ctx.clip()
      ctx.rotate(-f.slashAngle + f.rotation)
      ctx.font = `${f.sz}px ${EMOJI_FONT}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(f.emoji, 0, 0)
      ctx.globalAlpha = 1
      ctx.restore()
    })

    // Rings
    rings.forEach(r => {
      ctx.save()
      ctx.globalAlpha = Math.max(0, r.life) * 0.85
      ctx.strokeStyle = r.color
      ctx.lineWidth = 2.5
      ctx.shadowBlur = 14
      ctx.shadowColor = r.color
      ctx.beginPath()
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      ctx.restore()
    })

    // Particles
    particles.forEach(p => {
      ctx.save()
      ctx.globalAlpha = Math.max(0, p.life)
      ctx.fillStyle = p.color
      ctx.shadowBlur = 6
      ctx.shadowColor = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.sz, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
      ctx.globalAlpha = 1
      ctx.restore()
    })

    // Slash trail
    if (trail.length > 1) {
      const now = performance.now()
      ctx.save()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.shadowBlur = 18
      ctx.shadowColor = color
      for (let i = 1; i < trail.length; i++) {
        const age = (now - trail[i].t) / 220
        const alpha = Math.max(0, 1 - age)
        ctx.globalAlpha = alpha * 0.92
        ctx.strokeStyle = color
        ctx.lineWidth = Math.max(1, 5 * (1 - age * 0.6))
        ctx.beginPath()
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.stroke()
      }
      // White core
      ctx.shadowBlur = 0
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5
      for (let i = 1; i < trail.length; i++) {
        const age = (now - trail[i].t) / 220
        ctx.globalAlpha = Math.max(0, 1 - age) * 0.6
        ctx.beginPath()
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
        ctx.lineTo(trail[i].x, trail[i].y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.restore()
    }
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
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      stars = initStars(W(), H())
      objects = []; fragments = []; particles = []; rings = []; trail = []
      isMaestro = store().mode === 'maestro'
      lives = 3; score = 0; combo = 0; comboTimer = 0
      timeLeft = isMaestro ? 60000 : 0
      spawnTimer = 800; statsTimer = 0
      running = true
      window.addEventListener('resize', resize)
      pushStats(true)
      rafId = requestAnimationFrame(t => { lastT = t; loop(t) })
    },
    stop() {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    },
    addTrailPoint,
  }
}
