import { useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore.js'
import { createEngine } from '../game/engine.js'
import { startMusic, stopMusic } from '../game/audioEngine.js'
import HUD from '../components/HUD.jsx'
import Joystick from '../components/Joystick.jsx'
import WaveBanner from '../components/WaveBanner.jsx'
import ForceReady from '../components/ForceReady.jsx'
import s from './GameScreen.module.css'

export default function GameScreen() {
  const bgRef   = useRef(null)
  const gameRef = useRef(null)
  const ctrlMode = useGameStore(st => st.ctrlMode)

  useEffect(() => {
    const bgCanvas   = bgRef.current
    const gameCanvas = gameRef.current

    const engine = createEngine({
      bgCanvas,
      gameCanvas,
      store: useGameStore.getState,
    })
    engine.start()

    let musicStarted = false
    function ensureMusic() {
      if (!musicStarted) {
        musicStarted = true
        if (useGameStore.getState().musicEnabled) startMusic()
      }
    }

    // Touch → deflect via custom event
    const onTouch = (e) => {
      ensureMusic()
      e.preventDefault()
      gameCanvas.dispatchEvent(new CustomEvent('deflect', {
        detail: { touches: Array.from(e.changedTouches) },
      }))
    }
    // Click for desktop testing
    const onClick = (e) => {
      ensureMusic()
      gameCanvas.dispatchEvent(new CustomEvent('deflect', {
        detail: { touches: [{ clientX: e.clientX, clientY: e.clientY }] },
      }))
    }

    gameCanvas.addEventListener('touchstart', onTouch, { passive: false })
    gameCanvas.addEventListener('click', onClick)

    return () => {
      engine.stop()
      stopMusic()
      gameCanvas.removeEventListener('touchstart', onTouch)
      gameCanvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div className={s.screen}>
      <canvas ref={bgRef}   className={s.bgCanvas} />
      <canvas ref={gameRef} className={s.gameCanvas} />
      <HUD />
      <WaveBanner />
      <ForceReady />
      {ctrlMode === 3 && <Joystick />}
    </div>
  )
}
