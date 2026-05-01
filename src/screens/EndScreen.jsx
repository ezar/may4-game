import useGameStore from '../store/gameStore.js'
import { useT } from '../i18n/index.js'
import s from './EndScreen.module.css'

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
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

  const isWin     = result === 'win'
  const isSlash   = mode === 'slash'
  const isMaestro = mode === 'maestro'
  const isInfinite = mode === 'infinite'

  let quote
  if (isSlash || isMaestro)              quote = randomFrom(t.slashQuotes)
  else if (isWin && side === 'jedi')     quote = randomFrom(t.quotes.winJedi)
  else if (isWin && side === 'sith')     quote = randomFrom(t.quotes.winSith)
  else                                   quote = randomFrom(t.quotes.lose)

  function handleRetry() {
    const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
    document.documentElement.style.setProperty('--side-color', color)
    resetGame()
  }

  function getModeLabel() {
    if (isSlash)    return t.end.slashMode
    if (isMaestro)  return t.end.maestroMode
    if (isInfinite) return t.end.infiniteMode
    return null
  }

  const showVictory = isWin && !isSlash && !isMaestro && !isInfinite
  const titleText = showVictory ? t.end.victory : t.end.gameOver

  function getSubLabel() {
    if (isSlash || isMaestro) {
      const modeLabel = isSlash ? t.end.slashMode : t.end.maestroMode
      return `${modeLabel} · ${combo > 0 ? `Combo ×${combo}` : t.end.noCombo}`
    }
    if (isInfinite) {
      return `${t.end.infiniteMode} · ${t.hud.wave(wave)}`
    }
    return t.end.waveOf(wave)
  }

  return (
    <div className={s.screen}>
      <div className={s.inner}>
        <div className={`${s.title} ${showVictory ? s.win : s.lose}`}>
          {titleText}
        </div>

        {showVictory && <div className={s.stars}>{t.end.stars}</div>}

        <div className={s.scoreBox}>
          <div className={s.scoreLabel}>{t.end.finalScore}</div>
          <div className={s.scoreVal}>{score.toLocaleString()}</div>
          <div className={s.waveReached}>{getSubLabel()}</div>
        </div>

        <div className={s.quote}>{quote}</div>

        <button className={s.retryBtn} onClick={handleRetry}>
          {t.end.retry}
        </button>
      </div>
    </div>
  )
}
