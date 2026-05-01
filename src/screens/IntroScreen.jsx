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

export default function IntroScreen() {
  const side      = useGameStore(st => st.side)
  const ctrlMode  = useGameStore(st => st.ctrlMode)
  const setSide   = useGameStore(st => st.setSide)
  const setScreen = useGameStore(st => st.setScreen)
  const [detecting, setDetecting] = useState(false)

  async function handleActivate() {
    setDetecting(true)
    const store = useGameStore.getState()
    await tryActivateControls(store)
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
      <div className={s.logo}>
        <div className={s.may}>MAY THE 4TH</div>
        <div className={s.be}>BE WITH YOU</div>
        <div className={s.divider} />
      </div>

      <div className={s.chips}>
        <div className={s.chip}>
          <span className={s.chipIcon}>📱</span>
          <span>Inclina el móvil para moverte</span>
        </div>
        <div className={s.chip}>
          <span className={s.chipIcon}>👆</span>
          <span>Toca para deflectar disparos</span>
        </div>
        <div className={s.chip}>
          <span className={s.chipIcon}>⚡</span>
          <span>Fuerza al 100% → Force Blast</span>
        </div>
      </div>

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

      <div className={s.ctrlSection}>
        <button
          className={s.gyroBtn}
          onClick={handleActivate}
          disabled={detecting}
        >
          {detecting ? 'Detectando…' : 'Activar Giroscopio'}
        </button>
        <div className={`${s.pill} ${pill.cls}`}>
          {pill.text}
        </div>
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
