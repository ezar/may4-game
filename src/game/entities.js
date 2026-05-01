import { WAVES, ENEMY_TYPES } from './waves.js'

export function createEnemy({ x, y, speed, cx, cy, wave }) {
  const pool = ENEMY_TYPES.filter(t => t.minWave <= wave)
  const type  = pool[Math.floor(Math.random() * pool.length)]
  const angle = Math.atan2(cy - y, cx - x) + (Math.random() - 0.5) * 1.0
  const perpA = angle + Math.PI / 2

  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    perp: { x: Math.cos(perpA), y: Math.sin(perpA) },
    emoji: type.emoji,
    hp:    type.hp,
    maxHp: type.hp,
    pts:   type.pts,
    zig:   type.zig,
    t:     0,
    shootTO: 1400 + Math.random() * 1400,
    sz: 34,
  }
}

export function createBullet({ x, y, angle, speed, fromEnemy, side }) {
  const color = fromEnemy
    ? '#FF6B00'
    : (side === 'jedi' ? '#00BFFF' : '#FF1744')
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    r: 5,
    color,
    fromEnemy,
    fromPlayer: false,
    life: 5000,
  }
}

export function createParticle({ x, y, color }) {
  const angle = Math.random() * Math.PI * 2
  const spd   = 1.5 + Math.random() * 3
  return {
    x, y,
    vx: Math.cos(angle) * spd,
    vy: Math.sin(angle) * spd,
    color,
    life: 1,
    sz: 2 + Math.random() * 3,
  }
}

export function createRing({ x, y, maxR, blast = false }) {
  return { x, y, r: 8, maxR, life: 1, blast }
}
