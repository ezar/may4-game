import useGameStore from '../store/gameStore.js'
import { QUOTES } from '../game/waves.js'
import s from './EndScreen.module.css'

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function EndScreen() {
  const result = useGameStore(st => st.result)
  const side   = useGameStore(st => st.side)
  const score  = useGameStore(st => st.score)
  const wave   = useGameStore(st => st.wave)
  const resetGame = useGameStore(st => st.resetGame)

  const isWin = result === 'win'

  let quote
  if (isWin && side === 'jedi')  quote = randomFrom(QUOTES.winJedi)
  else if (isWin && side === 'sith') quote = randomFrom(QUOTES.winSith)
  else quote = randomFrom(QUOTES.lose)

  function handleRetry() {
    const color = side === 'jedi' ? '#00BFFF' : '#FF1744'
    document.documentElement.style.setProperty('--side-color', color)
    resetGame()
  }

  return (
    <div className={s.screen}>
      <div className={s.inner}>
        <div className={`${s.title} ${isWin ? s.win : s.lose}`}>
          {isWin ? '¡VICTORIA!' : 'GAME OVER'}
        </div>

        {isWin && <div className={s.stars}>✦ ✦ ✦</div>}

        <div className={s.scoreBox}>
          <div className={s.scoreLabel}>PUNTUACIÓN FINAL</div>
          <div className={s.scoreVal}>{score.toLocaleString()}</div>
          <div className={s.waveReached}>OLA {wave} de 5</div>
        </div>

        <div className={s.quote}>{quote}</div>

        <button className={s.retryBtn} onClick={handleRetry}>
          VOLVER A INTENTAR
        </button>
      </div>
    </div>
  )
}
