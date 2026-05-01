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
    const timer = setTimeout(() => setVisible(false), 2600)
    return () => clearTimeout(timer)
  }, [wave])

  const msg = t.waves.messages[wave - 1] ?? t.waves.messages[0]

  return (
    <div className={`${s.banner} ${visible ? s.visible : ''}`}>
      <div className={s.sub}>{msg[0]}</div>
      <div className={s.title}>{msg[1]}</div>
    </div>
  )
}
