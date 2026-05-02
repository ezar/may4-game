import useGameStore from '../store/gameStore.js'
import { useT } from '../i18n/index.js'
import s from './EndScreen.module.css'

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getRank(t, score, side, isWin, isSlash, isMaestro) {
  if (isSlash || isMaestro) {
    const list = t.end.ranks.slash
    if (score >= 1200) return list[0]
    if (score >= 600)  return list[1]
    if (score >= 200)  return list[2]
    return list[3]
  }
  if (!isWin) return t.end.ranks.lose
  const list = side === 'jedi' ? t.end.ranks.jedi : t.end.ranks.sith
  if (score >= 2000) return list[0]
  if (score >= 1000) return list[1]
  if (score >= 400)  return list[2]
  return list[3]
}

function Saber({ color, lit }) {
  return (
    <div className={s.saberWrap}>
      <div
        className={`${s.saberBlade} ${lit ? s.saberLit : s.saberDim}`}
        style={{ '--saber-color': color }}
      />
      <div className={s.saberHandle}>
        <div className={s.saberGuard} />
        <div className={s.saberGrip} />
        <div className={s.saberGrip} />
        <div className={s.saberEnd} />
      </div>
    </div>
  )
}

export default function EndScreen() {
  const t         = useT()
  const result    = useGameStore(st => st.result)
  const side      = useGameStore(st => st.side)
  const score     = useGameStore(st => st.score)
  const wave      = useGameStore(st => st.wave)
  const combo     = useGameStore(st => st.combo)
  const mode      = useGameStore(st => st.mode)
  const resetGame = useGameStore(st => st.resetGame)

  const isWin      = result === 'win'
  const isSlash    = mode === 'slash'
  const isMaestro  = mode === 'maestro'
  const isInfinite = mode === 'infinite'

  const sideColor = side === 'jedi' ? '#00BFFF' : '#FF1744'

  let quote
  if (isSlash || isMaestro)              quote = randomFrom(t.slashQuotes)
  else if (isWin && side === 'jedi')     quote = randomFrom(t.quotes.winJedi)
  else if (isWin && side === 'sith')     quote = randomFrom(t.quotes.winSith)
  else                                   quote = randomFrom(t.quotes.lose)

  const rank = getRank(t, score, side, isWin, isSlash, isMaestro)

  function handleRetry() {
    const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
    document.documentElement.style.setProperty('--side-color', color)
    resetGame()
  }

  function getSubLabel() {
    if (isSlash || isMaestro) {
      const modeLabel = isSlash ? t.end.slashMode : t.end.maestroMode
      return `${modeLabel} · ${combo > 0 ? `Combo ×${combo}` : t.end.noCombo}`
    }
    if (isInfinite) return `${t.end.infiniteMode} · ${t.hud.wave(wave)}`
    return t.end.waveOf(wave)
  }

  const showVictory = isWin && !isSlash && !isMaestro && !isInfinite
  const titleText   = showVictory ? t.end.victory : t.end.gameOver
  const saberLit    = showVictory || isSlash || isMaestro

  return (
    <div className={`${s.screen} ${showVictory ? s.winScreen : s.loseScreen}`}
         style={{ '--side-color': sideColor }}>

      <div className={s.bgGlow} style={{ background: `radial-gradient(ellipse 60% 40% at 50% 90%, ${sideColor}22 0%, transparent 70%)` }} />

      <div className={s.inner}>

        <div className={s.saberRow}>
          {showVictory ? (
            <>
              <Saber color={sideColor} lit={true} />
              <div className={s.saberSpark} style={{ '--spark-color': sideColor }} />
              <Saber color={sideColor} lit={true} />
            </>
          ) : (
            <Saber color={sideColor} lit={saberLit} />
          )}
        </div>

        <div className={`${s.title} ${showVictory ? s.win : s.lose}`}>
          {titleText}
        </div>

        <div className={s.rank} style={{ color: sideColor }}>
          {rank}
        </div>

        {showVictory && <div className={s.stars}>{t.end.stars}</div>}

        <div className={s.scoreBox} style={{ borderColor: `${sideColor}40` }}>
          <div className={s.scoreLabel}>{t.end.finalScore}</div>
          <div className={s.scoreVal}>{score.toLocaleString()}</div>
          <div className={s.waveReached}>{getSubLabel()}</div>
        </div>

        <div className={s.quote}>{quote}</div>

        <button className={s.retryBtn} onClick={handleRetry}
                style={{ background: sideColor }}>
          {t.end.retry}
        </button>
      </div>
    </div>
  )
}
