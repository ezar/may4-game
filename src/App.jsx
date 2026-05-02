import { useState } from 'react'
import useGameStore from './store/gameStore.js'
import CrawlScreen from './screens/CrawlScreen.jsx'
import IntroScreen from './screens/IntroScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import SlashScreen from './screens/SlashScreen.jsx'
import EndScreen from './screens/EndScreen.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'

export default function App() {
  const screen = useGameStore(st => st.screen)
  const mode   = useGameStore(st => st.mode)
  const [crawlDone, setCrawlDone] = useState(false)

  if (!crawlDone) return <CrawlScreen onDone={() => setCrawlDone(true)} />

  const isSlash = screen === 'game' && (mode === 'slash' || mode === 'maestro')
  const isGame  = screen === 'game' && !isSlash

  return (
    <>
      <SettingsPanel />
      {isSlash && <SlashScreen />}
      {isGame  && <GameScreen />}
      {screen === 'end'   && <EndScreen />}
      {screen === 'intro' && <IntroScreen />}
    </>
  )
}
