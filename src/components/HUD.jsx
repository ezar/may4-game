import useGameStore from '../store/gameStore.js'
import { useT } from '../i18n/index.js'
import s from './HUD.module.css'

export default function HUD() {
  const t      = useT()
  const health = useGameStore(st => st.health)
  const score  = useGameStore(st => st.score)
  const force  = useGameStore(st => st.force)
  const wave   = useGameStore(st => st.wave)
  const combo  = useGameStore(st => st.combo)

  const hpColor     = health > 60 ? '#00E676' : health > 30 ? '#FFEB3B' : '#FF1744'
  const forceReady  = force >= 100

  return (
    <div className={s.hud}>
      <div className={s.row}>
        <div className={s.barGroup}>
          <span className={s.label}>{t.hud.health}</span>
          <div className={s.barTrack}>
            <div
              className={s.barFill}
              style={{ width: `${health}%`, background: hpColor,
                boxShadow: health < 30 ? `0 0 8px ${hpColor}` : 'none' }}
            />
          </div>
          <span className={s.val}>{health}</span>
        </div>

        <div className={s.waveLabel}>{t.hud.wave(wave)}</div>

        <div className={s.barGroup}>
          <span className={s.val}>{score}</span>
          <div className={`${s.barTrack} ${forceReady ? s.barTrackReady : ''}`}>
            <div
              className={`${s.barFill} ${forceReady ? s.barFillReady : ''}`}
              style={{ width: `${Math.min(100, force)}%`, background: 'var(--side-color)' }}
            />
          </div>
          <span className={`${s.label} ${forceReady ? s.labelReady : ''}`}>
            {forceReady ? t.hud.forceReady : t.hud.force}
          </span>
        </div>
      </div>

      {combo >= 2 && (
        <div className={s.combo} key={combo}>×{combo} COMBO</div>
      )}

      <div className={s.hint}>{t.hud.hint}</div>
    </div>
  )
}
