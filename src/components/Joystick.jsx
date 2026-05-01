import { useRef, useCallback } from 'react'
import useGameStore from '../store/gameStore.js'
import s from './Joystick.module.css'

const BASE = 55  // radius of joystick base
const KNOB = 22  // radius of knob

export default function Joystick() {
  const setTilt  = useGameStore(st => st.setTilt)
  const joyId    = useRef(-1)
  const baseRef  = useRef(null)
  const knobRef  = useRef(null)
  const centerRef = useRef({ x: 0, y: 0 })

  const moveKnob = useCallback((dx, dy) => {
    const len = Math.sqrt(dx * dx + dy * dy)
    const clamped = Math.min(len, BASE)
    const nx = len > 0 ? (dx / len) * clamped : 0
    const ny = len > 0 ? (dy / len) * clamped : 0
    if (knobRef.current) {
      knobRef.current.style.transform = `translate(${nx}px, ${ny}px)`
    }
    // Normalize to -4..4
    setTilt((nx / BASE) * 4, (ny / BASE) * 4)
  }, [setTilt])

  const resetKnob = useCallback(() => {
    if (knobRef.current) knobRef.current.style.transform = 'translate(0,0)'
    setTilt(0, 0)
    joyId.current = -1
  }, [setTilt])

  const onTouchStart = useCallback((e) => {
    if (joyId.current !== -1) return
    const t = e.changedTouches[0]
    joyId.current = t.identifier
    const rect = baseRef.current.getBoundingClientRect()
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top  + rect.height / 2,
    }
    moveKnob(t.clientX - centerRef.current.x, t.clientY - centerRef.current.y)
    e.stopPropagation()
  }, [moveKnob])

  const onTouchMove = useCallback((e) => {
    for (const t of e.changedTouches) {
      if (t.identifier !== joyId.current) continue
      moveKnob(t.clientX - centerRef.current.x, t.clientY - centerRef.current.y)
    }
    e.stopPropagation()
  }, [moveKnob])

  const onTouchEnd = useCallback((e) => {
    for (const t of e.changedTouches) {
      if (t.identifier !== joyId.current) continue
      resetKnob()
    }
    e.stopPropagation()
  }, [resetKnob])

  // Mouse support for desktop testing
  const isDragging = useRef(false)
  const onMouseDown = (e) => {
    isDragging.current = true
    const rect = baseRef.current.getBoundingClientRect()
    centerRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    moveKnob(e.clientX - centerRef.current.x, e.clientY - centerRef.current.y)
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    moveKnob(e.clientX - centerRef.current.x, e.clientY - centerRef.current.y)
  }
  const onMouseUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    resetKnob()
  }

  return (
    <div
      ref={baseRef}
      className={s.base}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div ref={knobRef} className={s.knob} />
    </div>
  )
}
