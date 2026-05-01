export const WAVES = [
  { target: 6,  speed: 1.3, spawnMs: 2400, bSpeed: 2.8 },
  { target: 10, speed: 1.7, spawnMs: 1900, bSpeed: 3.3 },
  { target: 14, speed: 2.1, spawnMs: 1500, bSpeed: 3.8 },
  { target: 18, speed: 2.5, spawnMs: 1200, bSpeed: 4.3 },
  { target: 22, speed: 2.9, spawnMs: 1000, bSpeed: 4.8 },
]

export const WAVE_MESSAGES = [
  ['OLA 1', 'LA FUERZA DESPIERTA'],
  ['OLA 2', 'TROPAS IMPERIALES'],
  ['OLA 3', 'GUARDIAS OSCUROS'],
  ['OLA 4', 'EL IMPERIO AVANZA'],
  ['OLA 5', 'BATALLA FINAL'],
]

export const ENEMY_TYPES = [
  { emoji: '🤖', hp: 1, pts: 10, zig: false, minWave: 1 },
  { emoji: '👾', hp: 2, pts: 20, zig: false, minWave: 1 },
  { emoji: '🛸', hp: 1, pts: 15, zig: true,  minWave: 3 },
  { emoji: '💀', hp: 3, pts: 40, zig: false, minWave: 3 },
]

export const QUOTES = {
  winJedi: [
    '«Que la Fuerza te acompañe.»',
    '«Hazlo o no lo hagas. No existe el intentar.» — Yoda',
    '«La paz llega a quienes merecen la Fuerza.»',
  ],
  winSith: [
    '«A través del poder, gano la victoria.»',
    '«La pasión me da fuerza.»',
    '«El lado oscuro siempre fue más fuerte en ti.»',
  ],
  lose: [
    '«¡Mala sensación tengo!» — Han Solo',
    '«El lado oscuro… poderoso es.» — Yoda',
    '«No subestimes al Imperio.»',
    '«La galaxia necesita un héroe.»',
  ],
}
