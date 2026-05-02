// Canvas shape drawers for all entity types — centered at (0,0), sz=34 reference

export function drawDroid(ctx) {
  ctx.fillStyle = '#778899'
  ctx.beginPath(); ctx.roundRect(-10, 1, 20, 16, 2); ctx.fill()

  ctx.fillStyle = '#8899bb'
  ctx.beginPath(); ctx.roundRect(-10, -17, 20, 18, 3); ctx.fill()

  ctx.fillStyle = '#cc2200'
  ctx.shadowBlur = 8; ctx.shadowColor = '#ff4400'
  ctx.beginPath(); ctx.roundRect(-8, -14, 16, 7, 2); ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(Math.sin(Date.now() * 0.004) * 5, -10, 2.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = '#aabbcc'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0, -17); ctx.lineTo(0, -25); ctx.stroke()
  ctx.fillStyle = '#ff4400'
  ctx.shadowBlur = 5; ctx.shadowColor = '#ff4400'
  ctx.beginPath(); ctx.arc(0, -27, 3, 0, Math.PI * 2); ctx.fill()
  ctx.shadowBlur = 0

  ctx.strokeStyle = '#556677'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(-7, 8); ctx.lineTo(7, 8); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(-7, 13); ctx.lineTo(7, 13); ctx.stroke()
}

export function drawTrooper(ctx) {
  ctx.fillStyle = '#dcdce8'
  ctx.beginPath(); ctx.ellipse(0, -4, 13, 17, 0, 0, Math.PI * 2); ctx.fill()

  ctx.fillStyle = '#c4c4d4'
  ctx.beginPath(); ctx.ellipse(0, 10, 9, 7, 0, 0, Math.PI); ctx.fill()

  ctx.fillStyle = '#12121f'
  ctx.shadowBlur = 4; ctx.shadowColor = '#223'
  ctx.beginPath(); ctx.roundRect(-11, -14, 22, 10, 2); ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#202030'
  ctx.beginPath(); ctx.roundRect(-2, -4, 4, 9, 1); ctx.fill()

  ctx.fillStyle = '#b0b0c0'
  for (let i = 0; i < 3; i++) {
    ctx.beginPath(); ctx.rect(-13, 2 + i * 3, 3, 2); ctx.fill()
    ctx.beginPath(); ctx.rect(10, 2 + i * 3, 3, 2); ctx.fill()
  }
}

export function drawTIE(ctx) {
  ctx.fillStyle = '#1c2a38'
  ctx.strokeStyle = '#3a5060'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.rect(-34, -15, 15, 30); ctx.fill(); ctx.stroke()
  ctx.beginPath(); ctx.rect(19, -15, 15, 30); ctx.fill(); ctx.stroke()

  ctx.strokeStyle = '#2c3f50'; ctx.lineWidth = 0.5
  for (let y = -10; y <= 10; y += 5) {
    ctx.beginPath(); ctx.moveTo(-34, y); ctx.lineTo(-19, y); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(19, y); ctx.lineTo(34, y); ctx.stroke()
  }

  ctx.fillStyle = '#445566'
  ctx.beginPath(); ctx.roundRect(-19, -4, 19, 8, 2); ctx.fill()
  ctx.beginPath(); ctx.roundRect(0, -4, 19, 8, 2); ctx.fill()

  ctx.fillStyle = '#1e2f3f'
  ctx.shadowBlur = 8; ctx.shadowColor = '#0055aa'
  ctx.beginPath(); ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#002244'
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill()

  ctx.fillStyle = 'rgba(100,170,255,0.28)'
  ctx.beginPath(); ctx.ellipse(-3, -3, 4, 2.5, -0.5, 0, Math.PI * 2); ctx.fill()
}

export function drawElite(ctx) {
  ctx.fillStyle = '#18001e'
  ctx.beginPath(); ctx.ellipse(0, 12, 12, 14, 0, 0, Math.PI * 2); ctx.fill()

  ctx.fillStyle = '#200028'
  ctx.strokeStyle = '#550044'; ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, -28)
  ctx.lineTo(13, -8); ctx.lineTo(10, 8)
  ctx.lineTo(-10, 8); ctx.lineTo(-13, -8)
  ctx.closePath()
  ctx.fill(); ctx.stroke()

  ctx.fillStyle = '#FF1744'
  ctx.shadowBlur = 12; ctx.shadowColor = '#FF1744'
  ctx.beginPath(); ctx.ellipse(-5, -9, 4, 3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.ellipse(5, -9, 4, 3, 0, 0, Math.PI * 2); ctx.fill()
  ctx.shadowBlur = 0

  ctx.strokeStyle = '#FF1744'; ctx.lineWidth = 2
  ctx.shadowBlur = 8; ctx.shadowColor = '#FF1744'
  ctx.beginPath(); ctx.moveTo(13, 4); ctx.lineTo(26, -22); ctx.stroke()
  ctx.shadowBlur = 0
}

export function drawBomb(ctx) {
  // Bomb body
  ctx.fillStyle = '#1a1a1a'
  ctx.shadowBlur = 6; ctx.shadowColor = '#FF1744'
  ctx.beginPath(); ctx.arc(0, 3, 14, 0, Math.PI * 2); ctx.fill()
  ctx.shadowBlur = 0

  // Shine
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.beginPath(); ctx.ellipse(-5, -4, 5, 4, -0.4, 0, Math.PI * 2); ctx.fill()

  // Fuse cord
  ctx.strokeStyle = '#998844'; ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo(0, -11)
  ctx.bezierCurveTo(8, -20, 14, -20, 10, -28)
  ctx.stroke()

  // Fuse spark
  const flicker = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() * 0.012))
  ctx.fillStyle = '#FFD700'
  ctx.shadowBlur = 10 * flicker; ctx.shadowColor = '#FFD700'
  ctx.globalAlpha = flicker
  ctx.beginPath(); ctx.arc(10, -28, 4, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = 1; ctx.shadowBlur = 0
}

export const SHAPE_BY_EMOJI = {
  '🤖': drawDroid,
  '👾': drawTrooper,
  '🛸': drawTIE,
  '💀': drawElite,
  '💣': drawBomb,
}
