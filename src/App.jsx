import { useState } from 'react'
import useGameStore from './store/gameStore.js'
import CrawlScreen from './screens/CrawlScreen.jsx'
import IntroScreen from './screens/IntroScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import SlashScreen from './screens/SlashScreen.jsx'
import EndScreen from './screens/EndScreen.jsx'

export default function App() {
  const screen  = useGameStore(st => st.screen)
  const mode    = useGameStore(st => st.mode)
  const lang    = useGameStore(st => st.lang)
  const setLang = useGameStore(st => st.setLang)
  const [crawlDone, setCrawlDone] = useState(false)

  const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es')

  const langBtn = crawlDone ? (
    <button
      onClick={toggleLang}
      style={{
        position: 'fixed',
        top: '14px',
        left: '16px',
        zIndex: 100,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '8px',
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'var(--font-display)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        padding: '6px 10px',
        cursor: 'pointer',
      }}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  ) : null

  if (!crawlDone) return <CrawlScreen onDone={() => setCrawlDone(true)} />

  const isSlash = screen === 'game' && (mode === 'slash' || mode === 'maestro')
  const isGame  = screen === 'game' && !isSlash

  return (
    <>
      {langBtn}
      {isSlash && <SlashScreen />}
      {isGame  && <GameScreen />}
      {screen === 'end'   && <EndScreen />}
      {screen === 'intro' && <IntroScreen />}
    </>
  )
}
