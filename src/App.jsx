import { useState } from 'react'
import useGameStore from './store/gameStore.js'
import CrawlScreen from './screens/CrawlScreen.jsx'
import IntroScreen from './screens/IntroScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import EndScreen from './screens/EndScreen.jsx'

export default function App() {
  const screen     = useGameStore(st => st.screen)
  const [crawlDone, setCrawlDone] = useState(false)

  if (!crawlDone) return <CrawlScreen onDone={() => setCrawlDone(true)} />
  if (screen === 'game') return <GameScreen />
  if (screen === 'end')  return <EndScreen />
  return <IntroScreen />
}
