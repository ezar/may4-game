import { useState } from 'react'
import useGameStore from '../store/gameStore.js'
import { tryActivateControls } from '../game/controls.js'
import s from './IntroScreen.module.css'

const CTRL_LABELS = {
  0: { text: 'Sin activar', cls: '' },
  1: { text: '✓ Giroscopio activo', cls: s.ok },
  2: { text: '✓ Orientación activa', cls: s.ok },
  3: { text: '🕹 Joystick virtual', cls: s.ok },
}

const HOW_TO = [
  {
    icon: '📱',
    title: 'Muévete',
    desc: 'Inclina el móvil en cualquier dirección para mover tu personaje por la pantalla.',
  },
  {
    icon: '👆',
    title: 'Deflecta',
    desc: 'Toca cerca de un disparo enemigo para redirigirlo de vuelta contra ellos.',
  },
  {
    icon: '⚡',
    title: 'Force Blast',
    desc: 'Cada kill carga la barra de Fuerza. Al 100%, toca la pantalla para destruir todo.',
  },
]

const ENEMIES = [
  { emoji: '🤖', name: 'Droide',        hp: 1, pts: 10,  note: '' },
  { emoji: '👾', name: 'Stormtrooper',  hp: 2, pts: 20,  note: '' },
  { emoji: '🛸', name: 'TIE Fighter',   hp: 1, pts: 15,  note: 'Zigzag' },
  { emoji: '💀', name: 'Guardia Élite', hp: 3, pts: 40,  note: 'Ola 3+' },
]

export default function IntroScreen() {
  const side      = useGameStore(st => st.side)
  const ctrlMode  = useGameStore(st => st.ctrlMode)
  const setSide   = useGameStore(st => st.setSide)
  const setScreen = useGameStore(st => st.setScreen)
  const [detecting, setDetecting] = useState(false)
  const [tab, setTab] = useState('play') // 'play' | 'enemies'

  async function handleActivate() {
    setDetecting(true)
    await tryActivateControls(useGameStore.getState())
    setDetecting(false)
  }

  function handleSide(chosen) {
    setSide(chosen)
    const color = chosen === 'jedi' ? '#00BFFF' : '#FF1744'
    document.documentElement.style.setProperty('--side-color', color)
  }

  function handleStart() {
    if (!side || ctrlMode === 0) return
    setScreen('game')
  }

  const pill = detecting
    ? { text: 'Detectando…', cls: '' }
    : (CTRL_LABELS[ctrlMode] ?? CTRL_LABELS[0])

  const canStart = side !== null && ctrlMode > 0

  return (
    <div className={s.screen}>
      {/* Logo */}
      <div className={s.logo}>
        <div className={s.may}>MAY THE 4TH</div>
        <div className={s.be}>BE WITH YOU</div>
        <div className={s.divider} />
      </div>

      {/* How to play tabs */}
      <div className={s.howTo}>
        <div className={s.tabs}>
          <button
            className={`${s.tab} ${tab === 'play' ? s.tabActive : ''}`}
            onClick={() => setTab('play')}
          >Cómo jugar</button>
          <button
            className={`${s.tab} ${tab === 'enemies' ? s.tabActive : ''}`}
            onClick={() => setTab('enemies')}
          >Enemigos</button>
        </div>

        {tab === 'play' && (
          <div className={s.cards}>
            {HOW_TO.map(item => (
              <div key={item.title} className={s.card}>
                <span className={s.cardIcon}>{item.icon}</span>
                <div className={s.cardBody}>
                  <div className={s.cardTitle}>{item.title}</div>
                  <div className={s.cardDesc}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'enemies' && (
          <div className={s.enemyGrid}>
            {ENEMIES.map(e => (
              <div key={e.name} className={s.enemyCard}>
                <span className={s.enemyEmoji}>{e.emoji}</span>
                <div className={s.enemyName}>{e.name}</div>
                <div className={s.enemyStats}>
                  {'❤️'.repeat(e.hp)} · {e.pts}pts
                </div>
                {e.note && <div className={s.enemyNote}>{e.note}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Side selector */}
      <div className={s.sideSection}>
        <div className={s.sideLabel}>ELIGE TU BANDO</div>
        <div className={s.sides}>
          <button
            className={`${s.sideBtn} ${s.jedi} ${side === 'jedi' ? s.active : ''}`}
            onClick={() => handleSide('jedi')}
          >
            <span className={s.sideMoji}>⚔️</span>
            <span>JEDI</span>
          </button>
          <button
            className={`${s.sideBtn} ${s.sith} ${side === 'sith' ? s.active : ''}`}
            onClick={() => handleSide('sith')}
          >
            <span className={s.sideMoji}>⚡</span>
            <span>SITH</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className={s.ctrlSection}>
        <button
          className={s.gyroBtn}
          onClick={handleActivate}
          disabled={detecting}
        >
          {detecting ? 'Detectando…' : 'Activar Giroscopio'}
        </button>
        <div className={`${s.pill} ${pill.cls}`}>{pill.text}</div>
      </div>

      <button
        className={s.startBtn}
        onClick={handleStart}
        disabled={!canStart}
      >
        COMENZAR
      </button>
    </div>
  )
}
