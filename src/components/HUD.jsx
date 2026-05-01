import useGameStore from '../store/gameStore.js'
import s from './HUD.module.css'

export default function HUD() {
  const health = useGameStore(st => st.health)
  const score  = useGameStore(st => st.score)
  const force  = useGameStore(st => st.force)
  const wave   = useGameStore(st => st.wave)
  const combo  = useGameStore(st => st.combo)

  const hpColor = health > 60 ? '#00E676' : health > 30 ? '#FFEB3B' : '#FF1744'

  return (
    <div className={s.hud}>
      <div className={s.row}>
        <div className={s.barGroup}>
          <span className={s.label}>VIDA</span>
          <div className={s.barTrack}>
            <div
              className={s.barFill}
              style={{ width: `${health}%`, background: hpColor }}
            />
          </div>
          <span className={s.val}>{health}</span>
        </div>

        <div className={s.waveLabel}>OLA {wave}</div>

        <div className={s.barGroup}>
          <span className={s.val}>{score}</span>
          <div className={s.barTrack}>
            <div
              className={s.barFill}
              style={{ width: `${Math.min(100, force)}%`, background: 'var(--side-color)' }}
            />
          </div>
          <span className={s.label}>FUERZA</span>
        </div>
      </div>

      {combo >= 2 && (
        <div className={s.combo}>×{combo} COMBO</div>
      )}

      <div className={s.hint}>TAP → DEFLECTAR · FORCE BLAST</div>
    </div>
  )
}
