import { useState, useEffect } from 'react'
import useGameStore from '../store/gameStore.js'
import { WAVE_MESSAGES } from '../game/waves.js'
import s from './WaveBanner.module.css'

export default function WaveBanner() {
  const wave = useGameStore(st => st.wave)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 2600)
    return () => clearTimeout(t)
  }, [wave])

  const msg = WAVE_MESSAGES[wave - 1] ?? WAVE_MESSAGES[0]

  return (
    <div className={`${s.banner} ${visible ? s.visible : ''}`}>
      <div className={s.sub}>{msg[0]}</div>
      <div className={s.title}>{msg[1]}</div>
    </div>
  )
}
