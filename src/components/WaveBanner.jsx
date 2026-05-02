import { useState, useEffect } from 'react'
import useGameStore from '../store/gameStore.js'
import { useT } from '../i18n/index.js'
import s from './WaveBanner.module.css'

export default function WaveBanner() {
  const t    = useT()
  const wave = useGameStore(st => st.wave)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [wave])

  const msg = t.waves.messages[wave - 1] ?? t.waves.messages[0]
  // msg: [num_label, location, subtitle]
  const numLabel = msg[0]
  const location = msg[1]
  const subtitle = msg[2]

  return (
    <div className={`${s.banner} ${visible ? s.visible : ''}`}>
      <div className={s.num}>{numLabel}</div>
      <div className={s.location}>{location}</div>
      <div className={s.title}>{subtitle}</div>
    </div>
  )
}
