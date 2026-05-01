import { useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore.js'
import { createSlashEngine } from '../game/slashEngine.js'
import s from './SlashScreen.module.css'

export default function SlashScreen() {
  const health = useGameStore(st => st.health)
  const score  = useGameStore(st => st.score)
  const combo  = useGameStore(st => st.combo)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const engine = createSlashEngine({ canvas, store: useGameStore.getState })
    engine.start()

    let dragging = false

    function getPos(clientX, clientY) {
      const rect = canvas.getBoundingClientRect()
      return { x: clientX - rect.left, y: clientY - rect.top }
    }

    function onTouchStart(e) {
      const now = performance.now()
      for (const t of e.changedTouches) {
        const p = getPos(t.clientX, t.clientY)
        engine.addTrailPoint(p.x, p.y, now)
      }
    }

    function onTouchMove(e) {
      e.preventDefault()
      const now = performance.now()
      for (const t of e.changedTouches) {
        const p = getPos(t.clientX, t.clientY)
        engine.addTrailPoint(p.x, p.y, now)
      }
    }

    function onMouseDown(e) {
      dragging = true
      const p = getPos(e.clientX, e.clientY)
      engine.addTrailPoint(p.x, p.y, performance.now())
    }

    function onMouseMove(e) {
      if (!dragging) return
      const p = getPos(e.clientX, e.clientY)
      engine.addTrailPoint(p.x, p.y, performance.now())
    }

    function onMouseUp() { dragging = false }

    canvas.addEventListener('touchstart',  onTouchStart, { passive: true })
    canvas.addEventListener('touchmove',   onTouchMove,  { passive: false })
    canvas.addEventListener('mousedown',   onMouseDown)
    canvas.addEventListener('mousemove',   onMouseMove)
    window.addEventListener('mouseup',     onMouseUp)

    return () => {
      engine.stop()
      canvas.removeEventListener('touchstart',  onTouchStart)
      canvas.removeEventListener('touchmove',   onTouchMove)
      canvas.removeEventListener('mousedown',   onMouseDown)
      canvas.removeEventListener('mousemove',   onMouseMove)
      window.removeEventListener('mouseup',     onMouseUp)
    }
  }, [])

  const lives = Math.max(0, Math.round(health / 34))

  return (
    <div className={s.screen}>
      <canvas ref={canvasRef} className={s.canvas} />

      <div className={s.hud}>
        <div className={s.lives}>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className={i < lives ? s.lifeOn : s.lifeOff}>❤</span>
          ))}
        </div>
        <div className={s.score}>{score.toLocaleString()}</div>
        <div className={s.combo} key={combo}>
          {combo > 1 ? `×${combo}` : ' '}
        </div>
      </div>
    </div>
  )
}
