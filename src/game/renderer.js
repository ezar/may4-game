export function clearCanvas(ctx, w, h) {
  ctx.clearRect(0, 0, w, h)
}

export function drawStars(ctx, stars, w, h) {
  stars.forEach(s => {
    s.y += s.speed
    s.twinkle += s.twinkleSpeed
    if (s.y > h) { s.y = 0; s.x = Math.random() * w }
    const alpha = 0.3 + 0.7 * Math.abs(Math.sin(s.twinkle))
    ctx.globalAlpha = alpha
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.sz, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1
}

export function drawPlayer(ctx, { px, py, side }) {
  const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
  ctx.save()
  ctx.translate(px, py)

  // Body
  ctx.fillStyle = '#667'
  ctx.beginPath()
  ctx.ellipse(0, 14, 11, 14, 0, 0, Math.PI * 2)
  ctx.fill()

  // Head
  ctx.fillStyle = '#99a'
  ctx.beginPath()
  ctx.arc(0, -8, 11, 0, Math.PI * 2)
  ctx.fill()

  // Visor
  ctx.fillStyle = color
  ctx.shadowBlur = 8
  ctx.shadowColor = color
  ctx.beginPath()
  ctx.roundRect(-8, -14, 16, 7, 3)
  ctx.fill()
  ctx.shadowBlur = 0

  // Saber handle
  ctx.fillStyle = '#888'
  ctx.beginPath()
  ctx.roundRect(10, 2, 4, 12, 1)
  ctx.fill()

  // Saber blade
  ctx.fillStyle = color
  ctx.shadowBlur = 12
  ctx.shadowColor = color
  ctx.beginPath()
  ctx.roundRect(11, -18, 2, 20, 1)
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.restore()
}

export function drawPlayerGlow(ctx, { px, py, side }) {
  const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
  const grad = ctx.createRadialGradient(px, py, 0, px, py, 55)
  grad.addColorStop(0, color + '26')
  grad.addColorStop(1, 'transparent')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(px, py, 55, 0, Math.PI * 2)
  ctx.fill()
}

export function drawEnemy(ctx, enemy) {
  ctx.save()
  ctx.font = `${enemy.sz}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(enemy.emoji, enemy.x, enemy.y)

  if (enemy.maxHp > 1) {
    const bw = 36, bh = 4
    const bx = enemy.x - bw / 2
    const by = enemy.y + enemy.sz / 2 + 2
    ctx.fillStyle = '#222'
    ctx.beginPath()
    ctx.roundRect(bx, by, bw, bh, 2)
    ctx.fill()
    ctx.fillStyle = '#FF6B00'
    ctx.beginPath()
    ctx.roundRect(bx, by, bw * (enemy.hp / enemy.maxHp), bh, 2)
    ctx.fill()
  }

  ctx.restore()
}

export function drawBullet(ctx, bullet) {
  ctx.save()
  ctx.fillStyle = bullet.color
  ctx.shadowBlur = 10
  ctx.shadowColor = bullet.color
  ctx.beginPath()
  ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.restore()
}

export function drawParticle(ctx, p) {
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
}

export function drawRing(ctx, ring, side) {
  const color = ring.blast ? '#FFD700' : (side === 'jedi' ? '#00BFFF' : '#FF1744')
  ctx.save()
  ctx.globalAlpha = Math.max(0, ring.life) * 0.8
  ctx.strokeStyle = color
  ctx.lineWidth = ring.blast ? 5 : 2
  ctx.shadowBlur = 20
  ctx.shadowColor = color
  ctx.beginPath()
  ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
  ctx.restore()
}
