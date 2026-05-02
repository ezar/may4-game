import { create } from 'zustand'

const _ls = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v === null ? fallback : v } catch { return fallback }
}
const _savedLang = _ls('sw-lang', null)
const _savedMusic = _ls('sw-musicEnabled', 'true') === 'true'

const useGameStore = create((set) => ({
  side:     null,
  ctrlMode: 0,
  mode:     null,   // 'survival' | 'slash' | 'infinite' | 'maestro'
  screen:   'intro',
  score:    0,
  health:   100,
  force:    0,
  wave:     1,
  combo:    0,
  result:   null,
  tiltX:    0,
  tiltY:    0,
  lang: _savedLang ?? ((typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')) ? 'es' : 'en'),
  musicEnabled: _savedMusic,

  setSide:     (side)         => set({ side }),
  setCtrlMode: (ctrlMode)     => set({ ctrlMode }),
  setMode:     (mode)         => set({ mode }),
  setScreen:   (screen)       => set({ screen }),
  setTilt:     (tiltX, tiltY) => set({ tiltX, tiltY }),
  updateStats: (stats)        => set(stats),
  setResult:   (result)       => set({ result }),
  setLang: (lang) => {
    try { localStorage.setItem('sw-lang', lang) } catch {}
    set({ lang })
  },
  setMusicEnabled: (v) => {
    try { localStorage.setItem('sw-musicEnabled', String(v)) } catch {}
    set({ musicEnabled: v })
  },
  resetGame:   () => set({
    score: 0, health: 100, force: 0, wave: 1, combo: 0,
    result: null, tiltX: 0, tiltY: 0, screen: 'intro',
    side: null, ctrlMode: 0, mode: null,
  }),
}))

export default useGameStore
