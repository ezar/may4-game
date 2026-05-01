import { useState } from 'react'
import useGameStore from './store/gameStore.js'
import CrawlScreen from './screens/CrawlScreen.jsx'
import IntroScreen from './screens/IntroScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import SlashScreen from './screens/SlashScreen.jsx'
import EndScreen from './screens/EndScreen.jsx'

export default function App() {
  const screen = useGameStore(st => st.screen)
  const mode   = useGameStore(st => st.mode)
  const [crawlDone, setCrawlDone] = useState(false)

  if (!crawlDone) return <CrawlScreen onDone={() => setCrawlDone(true)} />
  if (screen === 'game' && mode === 'slash') return <SlashScreen />
  if (screen === 'game') return <GameScreen />
  if (screen === 'end')  return <EndScreen />
  return <IntroScreen />
}
