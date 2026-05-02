import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore.js'
import { tryActivateControls } from '../game/controls.js'
import { startMusic } from '../game/audioEngine.js'
import { useT } from '../i18n/index.js'
import s from './IntroScreen.module.css'

function useStarfield(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      sz: 0.4 + Math.random() * 1.4,
      speed: 0.15 + Math.random() * 0.4,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
    }))

    const loop = () => {
      ctx.fillStyle = 'rgba(3,3,15,0.25)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach(st => {
        st.y += st.speed
        st.twinkle += st.twinkleSpeed
        if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width }
        ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(st.twinkle))
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.sz, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])
}

export default function IntroScreen() {
  const t         = useT()
  const side      = useGameStore(st => st.side)
  const ctrlMode  = useGameStore(st => st.ctrlMode)
  const mode      = useGameStore(st => st.mode)
  const setSide   = useGameStore(st => st.setSide)
  const setMode   = useGameStore(st => st.setMode)
  const setScreen = useGameStore(st => st.setScreen)
  const [detecting, setDetecting] = useState(false)
  const [tab, setTab] = useState('play')
  const canvasRef     = useRef(null)
  const musicStarted  = useRef(false)
  useStarfield(canvasRef)

  useEffect(() => {
    function onFirstGesture() {
      if (!musicStarted.current && useGameStore.getState().musicEnabled) {
        musicStarted.current = true
        startMusic()
      }
    }
    window.addEventListener('pointerdown', onFirstGesture, { once: true })
    return () => window.removeEventListener('pointerdown', onFirstGesture)
  }, [])

  async function handleActivate() {
    setDetecting(true)
    await tryActivateControls(useGameStore.getState())
    setDetecting(false)
  }

  function handleSide(chosen) {
    setSide(chosen)
    document.documentElement.style.setProperty(
      '--side-color', chosen === 'jedi' ? '#00BFFF' : '#FF1744'
    )
  }

  function handleStart() {
    if (!side || !mode) return
    if ((mode === 'survival' || mode === 'infinite') && ctrlMode === 0) return
    setScreen('game')
  }

  const ctrlLabel = t.intro.ctrlLabels[ctrlMode] ?? t.intro.ctrlLabels[0]
  const pill = detecting
    ? { text: t.general.detecting, cls: '' }
    : { text: ctrlLabel.text, cls: ctrlLabel.cls ? s[ctrlLabel.cls] : '' }

  const needsGyro = mode === 'survival' || mode === 'infinite'
  const canStart = side !== null && mode !== null && (!needsGyro || ctrlMode > 0)

  const isSlashMode = mode === 'slash' || mode === 'maestro'

  return (
    <div className={s.screen}>
      <canvas ref={canvasRef} className={s.starfield} />

      <div className={s.content}>
        <header className={s.logo}>
          <div className={s.logoEyebrow}>{t.general.starWarsDay}</div>
          <div className={s.may}>{t.general.mayThe4th}</div>
          <div className={s.be}>{t.general.beWithYou}</div>
          <div className={s.divider} />
        </header>

        <section className={s.sideSection}>
          <div className={s.sideLabel}>{t.intro.chooseSide}</div>
          <div className={s.sides}>
            <button
              className={`${s.sideBtn} ${s.jedi} ${side === 'jedi' ? s.active : ''}`}
              onClick={() => handleSide('jedi')}
            >
              <span className={s.sideGlow} />
              <span className={s.sideMoji}>⚔️</span>
              <span className={s.sideName}>JEDI</span>
              <span className={s.sideTagline}>{t.intro.jediTagline}</span>
            </button>
            <button
              className={`${s.sideBtn} ${s.sith} ${side === 'sith' ? s.active : ''}`}
              onClick={() => handleSide('sith')}
            >
              <span className={s.sideGlow} />
              <span className={s.sideMoji}>⚡</span>
              <span className={s.sideName}>SITH</span>
              <span className={s.sideTagline}>{t.intro.sithTagline}</span>
            </button>
          </div>
        </section>

        <section className={s.modeSection}>
          <div className={s.sideLabel}>{t.intro.gameMode}</div>
          <div className={s.modes}>
            <button
              className={`${s.modeBtn} ${mode === 'survival' ? s.modeActive : ''}`}
              onClick={() => setMode('survival')}
            >
              <span className={s.modeMoji}>🛡️</span>
              <span className={s.modeName}>{t.intro.survival}</span>
              <span className={s.modeDesc}>{t.intro.survivalDesc}</span>
            </button>
            <button
              className={`${s.modeBtn} ${mode === 'slash' ? s.modeActive : ''}`}
              onClick={() => setMode('slash')}
            >
              <span className={s.modeMoji}>⚔️</span>
              <span className={s.modeName}>{t.intro.slash}</span>
              <span className={s.modeDesc}>{t.intro.slashDesc}</span>
            </button>
            <button
              className={`${s.modeBtn} ${mode === 'infinite' ? s.modeActive : ''}`}
              onClick={() => setMode('infinite')}
            >
              <span className={s.modeMoji}>♾️</span>
              <span className={s.modeName}>{t.intro.infinite}</span>
              <span className={s.modeDesc}>{t.intro.infiniteDesc}</span>
            </button>
            <button
              className={`${s.modeBtn} ${mode === 'maestro' ? s.modeActive : ''}`}
              onClick={() => setMode('maestro')}
            >
              <span className={s.modeMoji}>⏱️</span>
              <span className={s.modeName}>{t.intro.maestro}</span>
              <span className={s.modeDesc}>{t.intro.maestroDesc}</span>
            </button>
          </div>
        </section>

        <section className={s.howTo}>
          <div className={s.tabs}>
            <button
              className={`${s.tab} ${tab === 'play' ? s.tabActive : ''}`}
              onClick={() => setTab('play')}
            >{t.intro.tabPlay}</button>
            <button
              className={`${s.tab} ${tab === 'enemies' ? s.tabActive : ''}`}
              onClick={() => setTab('enemies')}
            >{isSlashMode ? t.intro.tabObjects : t.intro.tabEnemies}</button>
            {!isSlashMode && (
              <button
                className={`${s.tab} ${tab === 'waves' ? s.tabActive : ''}`}
                onClick={() => setTab('waves')}
              >{t.intro.tabWaves}</button>
            )}
          </div>

          {tab === 'play' && (
            <div className={s.cards}>
              {(mode === 'maestro'
                ? t.intro.howToMaestro
                : isSlashMode
                  ? t.intro.howToSlash
                  : t.intro.howTo
              ).map((item, i) => (
                <div key={item.title} className={s.card} style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className={s.cardIcon}>{item.icon}</span>
                  <div>
                    <div className={s.cardTitle}>{item.title}</div>
                    <div className={s.cardDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'enemies' && (
            <div className={s.enemyGrid}>
              {(isSlashMode ? t.intro.slashObjects : t.intro.enemies).map((e, i) => (
                <div key={e.name} className={s.enemyCard} style={{ animationDelay: `${i * 0.06}s` }}>
                  <span className={s.enemyEmoji}>{e.emoji}</span>
                  <div className={s.enemyName}>{e.name}</div>
                  <div className={s.enemyDetail}>{e.detail}</div>
                  {e.note && <div className={s.enemyNote}>{e.note}</div>}
                </div>
              ))}
            </div>
          )}

          {tab === 'waves' && !isSlashMode && (
            <div className={s.waveList}>
              {t.intro.waveRows.map(([wave, name, kills, note], i) => (
                <div key={wave} className={s.waveRow} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className={s.waveNum}>{wave}</div>
                  <div className={s.waveInfo}>
                    <span className={s.waveName}>{name}</span>
                    <span className={s.waveNote}>{kills} · {note}</span>
                  </div>
                </div>
              ))}
              <div className={s.waveTip}>{t.intro.waveTip}</div>
            </div>
          )}
        </section>

        <footer className={s.footer}>
          {needsGyro && (
            <div className={s.ctrlRow}>
              <button className={s.gyroBtn} onClick={handleActivate} disabled={detecting}>
                {detecting ? t.general.detecting : t.intro.activateGyro}
              </button>
              <div className={`${s.pill} ${pill.cls}`}>{pill.text}</div>
            </div>
          )}

          <button className={s.startBtn} onClick={handleStart} disabled={!canStart}>
            {canStart
              ? t.intro.startLabel(mode, side)
              : t.intro.startDefault}
          </button>

          {!side && <p className={s.hint}>{t.intro.hintSide}</p>}
          {side && !mode && <p className={s.hint}>{t.intro.hintMode}</p>}
          {side && needsGyro && ctrlMode === 0 && <p className={s.hint}>{t.intro.hintGyro}</p>}
        </footer>
      </div>
    </div>
  )
}
