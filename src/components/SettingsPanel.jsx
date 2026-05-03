import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore.js'
import { startMusic, stopMusic, setSfxEnabled } from '../game/audioEngine.js'
import { useT } from '../i18n/index.js'
import s from './SettingsPanel.module.css'

export const VERSION = '26.05.02.1538'

export default function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const btnRef   = useRef(null)

  const lang            = useGameStore(st => st.lang)
  const setLang         = useGameStore(st => st.setLang)
  const musicEnabled    = useGameStore(st => st.musicEnabled)
  const setMusicEnabled = useGameStore(st => st.setMusicEnabled)
  const sfxEnabled      = useGameStore(st => st.sfxEnabled)
  const setSfxEnabledStore = useGameStore(st => st.setSfxEnabled)
  const t = useT()

  function toggleMusic() {
    const next = !musicEnabled
    setMusicEnabled(next)
    if (next) startMusic()
    else      stopMusic()
  }

  function toggleSfx() {
    const next = !sfxEnabled
    setSfxEnabledStore(next)
    setSfxEnabled(next)
  }

  function toggleLang() {
    setLang(lang === 'es' ? 'en' : 'es')
  }

  useEffect(() => {
    if (!open) return
    function onPointerDown(e) {
      if (panelRef.current?.contains(e.target)) return
      if (btnRef.current?.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div className={s.wrapper}>
      <button
        ref={btnRef}
        className={`${s.gearBtn} ${open ? s.gearOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Settings"
      >
        ⚙
      </button>

      {open && (
        <div ref={panelRef} className={s.panel}>
          <div className={s.panelTitle}>{t.settings.title}</div>

          <div className={s.row}>
            <span className={s.label}>{t.settings.music}</span>
            <button
              className={`${s.toggle} ${musicEnabled ? s.toggleOn : s.toggleOff}`}
              onClick={toggleMusic}
            >
              {musicEnabled ? t.settings.on : t.settings.off}
            </button>
          </div>

          <div className={s.row}>
            <span className={s.label}>{t.settings.sfx}</span>
            <button
              className={`${s.toggle} ${sfxEnabled ? s.toggleOn : s.toggleOff}`}
              onClick={toggleSfx}
            >
              {sfxEnabled ? t.settings.on : t.settings.off}
            </button>
          </div>

          <div className={s.row}>
            <span className={s.label}>{t.settings.language}</span>
            <button className={`${s.toggle} ${s.toggleOn}`} onClick={toggleLang}>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          <div className={s.versionBlock}>
            <div className={s.versionNum}>v{VERSION}</div>
            <div className={s.copyright}>© 2026 · Fan game · Not for commercial use</div>
            <div className={s.disclaimer}>
              Star Wars™ &amp; © Lucasfilm Ltd.<br />
              Not affiliated with Disney or Lucasfilm.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
