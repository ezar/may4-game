import useGameStore from '../store/gameStore.js'
import s from './ForceReady.module.css'

export default function ForceReady() {
  const force = useGameStore(st => st.force)
  if (force < 100) return null

  return (
    <div className={s.banner}>
      ⚡ TOCA · FORCE BLAST
    </div>
  )
}
