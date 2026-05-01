import useGameStore from './store/gameStore.js'
import IntroScreen from './screens/IntroScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import EndScreen from './screens/EndScreen.jsx'

export default function App() {
  const screen = useGameStore(st => st.screen)
  if (screen === 'game') return <GameScreen />
  if (screen === 'end')  return <EndScreen />
  return <IntroScreen />
}
