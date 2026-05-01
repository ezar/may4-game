import useGameStore from '../store/gameStore.js'
import { QUOTES } from '../game/waves.js'
import s from './EndScreen.module.css'

const SLASH_QUOTES = [
  '"El sable de luz es la vida del Jedi." — Obi-Wan Kenobi',
  '"Corta primero, pregunta después." — Sabiduría Sith',
  '"El movimiento más rápido es el que no se ve venir." — Yoda',
  '"Un guerrero sin espada no es guerrero." — Proverbio Mandaloriano',
  '"La Fuerza guía mi hoja." — Anakin Skywalker',
]

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function EndScreen() {
  const result    = useGameStore(st => st.result)
  const side      = useGameStore(st => st.side)
  const score     = useGameStore(st => st.score)
  const wave      = useGameStore(st => st.wave)
  const combo     = useGameStore(st => st.combo)
  const mode      = useGameStore(st => st.mode)
  const resetGame = useGameStore(st => st.resetGame)

  const isWin    = result === 'win'
  const isSlash  = mode === 'slash'

  let quote
  if (isSlash)               quote = randomFrom(SLASH_QUOTES)
  else if (isWin && side === 'jedi')  quote = randomFrom(QUOTES.winJedi)
  else if (isWin && side === 'sith')  quote = randomFrom(QUOTES.winSith)
  else                                quote = randomFrom(QUOTES.lose)

  function handleRetry() {
    const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
    document.documentElement.style.setProperty('--side-color', color)
    resetGame()
  }

  return (
    <div className={s.screen}>
      <div className={s.inner}>
        <div className={`${s.title} ${isWin && !isSlash ? s.win : s.lose}`}>
          {isWin && !isSlash ? '¡VICTORIA!' : 'GAME OVER'}
        </div>

        {isWin && !isSlash && <div className={s.stars}>✦ ✦ ✦</div>}

        <div className={s.scoreBox}>
          <div className={s.scoreLabel}>PUNTUACIÓN FINAL</div>
          <div className={s.scoreVal}>{score.toLocaleString()}</div>
          {isSlash
            ? <div className={s.waveReached}>MODO SABLE · {combo > 0 ? `Combo ×${combo}` : 'Sin combo'}</div>
            : <div className={s.waveReached}>OLA {wave} de 5</div>
          }
        </div>

        <div className={s.quote}>{quote}</div>

        <button className={s.retryBtn} onClick={handleRetry}>
          VOLVER A INTENTAR
        </button>
      </div>
    </div>
  )
}
