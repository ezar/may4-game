import { create } from 'zustand'

const useGameStore = create((set) => ({
  side:    null,
  ctrlMode: 0,
  screen:  'intro',
  score:   0,
  health:  100,
  force:   0,
  wave:    1,
  combo:   0,
  result:  null,
  tiltX:   0,
  tiltY:   0,

  setSide:     (side)    => set({ side }),
  setCtrlMode: (ctrlMode) => set({ ctrlMode }),
  setScreen:   (screen)  => set({ screen }),
  setTilt:     (tiltX, tiltY) => set({ tiltX, tiltY }),
  updateStats: (stats)   => set(stats),
  setResult:   (result)  => set({ result }),
  resetGame:   () => set({
    score: 0, health: 100, force: 0, wave: 1, combo: 0,
    result: null, tiltX: 0, tiltY: 0, screen: 'intro',
    side: null, ctrlMode: 0,
  }),
}))

export default useGameStore
