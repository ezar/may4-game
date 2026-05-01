import { useState, useEffect, useRef } from 'react'
import useGameStore from '../store/gameStore.js'
import { tryActivateControls } from '../game/controls.js'
import s from './IntroScreen.module.css'

const CTRL_LABELS = {
  0: { text: 'Sin activar', cls: '' },
  1: { text: '✓ Giroscopio activo', cls: s.ok },
  2: { text: '✓ Orientación activa', cls: s.ok },
  3: { text: '🕹 Joystick virtual', cls: s.ok },
}

const HOW_TO = [
  { icon: '📱', title: 'Inclina', desc: 'Mueve tu personaje inclinando el móvil en cualquier dirección.' },
  { icon: '👆', title: 'Deflecta', desc: 'Toca cerca de un disparo para redirigirlo contra el enemigo.' },
  { icon: '⚡', title: 'Force Blast', desc: 'Cada kill carga tu Fuerza. Al 100%, toca para devastar la pantalla.' },
  { icon: '💥', title: 'Combo', desc: 'Kills rápidos consecutivos multiplican tu puntuación.' },
]

const HOW_TO_SLASH = [
  { icon: '🖐️', title: 'Desliza', desc: 'Arrastra el dedo rápido sobre los objetos para cortarlos con tu sable.' },
  { icon: '💣', title: 'Cuidado', desc: 'Las bombas te quitan una vida. ¡Nunca las cortes!' },
  { icon: '✨', title: 'Combo', desc: 'Cortes rápidos consecutivos multiplican tu puntuación.' },
  { icon: '❤️', title: 'Vidas', desc: 'Tienes 3 vidas. Cortar una bomba o dejar escapar un objeto las consume.' },
]

const ENEMIES = [
  { emoji: '🤖', name: 'Droide',        detail: '1 HP · 10 pts',  note: '' },
  { emoji: '👾', name: 'Stormtrooper',  detail: '2 HP · 20 pts',  note: '' },
  { emoji: '🛸', name: 'TIE Fighter',   detail: '1 HP · 15 pts',  note: 'Zigzag' },
  { emoji: '💀', name: 'Guardia Élite', detail: '3 HP · 40 pts',  note: 'Ola 3+' },
]

const SLASH_OBJECTS = [
  { emoji: '🤖', name: 'Droide',        detail: '10 pts',   note: '' },
  { emoji: '👾', name: 'Stormtrooper',  detail: '20 pts',   note: '' },
  { emoji: '🛸', name: 'TIE Fighter',   detail: '15 pts',   note: '' },
  { emoji: '💀', name: 'Guardia Élite', detail: '40 pts',   note: 'Escaso' },
  { emoji: '💣', name: 'Bomba',         detail: '−1 vida',  note: '¡No cortar!' },
]

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
  const side      = useGameStore(st => st.side)
  const ctrlMode  = useGameStore(st => st.ctrlMode)
  const mode      = useGameStore(st => st.mode)
  const setSide   = useGameStore(st => st.setSide)
  const setMode   = useGameStore(st => st.setMode)
  const setScreen = useGameStore(st => st.setScreen)
  const [detecting, setDetecting] = useState(false)
  const [tab, setTab] = useState('play')
  const canvasRef = useRef(null)
  useStarfield(canvasRef)

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
    if (mode === 'survival' && ctrlMode === 0) return
    setScreen('game')
  }

  const pill = detecting
    ? { text: 'Detectando…', cls: '' }
    : (CTRL_LABELS[ctrlMode] ?? CTRL_LABELS[0])

  const canStart = side !== null && mode !== null && (mode === 'slash' || ctrlMode > 0)

  return (
    <div className={s.screen}>
      <canvas ref={canvasRef} className={s.starfield} />

      <div className={s.content}>
        {/* Logo */}
        <header className={s.logo}>
          <div className={s.logoEyebrow}>— STAR WARS DAY —</div>
          <div className={s.may}>MAY THE 4TH</div>
          <div className={s.be}>BE WITH YOU</div>
          <div className={s.divider} />
        </header>

        {/* Side selector */}
        <section className={s.sideSection}>
          <div className={s.sideLabel}>ELIGE TU BANDO</div>
          <div className={s.sides}>
            <button
              className={`${s.sideBtn} ${s.jedi} ${side === 'jedi' ? s.active : ''}`}
              onClick={() => handleSide('jedi')}
            >
              <span className={s.sideGlow} />
              <span className={s.sideMoji}>⚔️</span>
              <span className={s.sideName}>JEDI</span>
              <span className={s.sideTagline}>Luz y paz</span>
            </button>
            <button
              className={`${s.sideBtn} ${s.sith} ${side === 'sith' ? s.active : ''}`}
              onClick={() => handleSide('sith')}
            >
              <span className={s.sideGlow} />
              <span className={s.sideMoji}>⚡</span>
              <span className={s.sideName}>SITH</span>
              <span className={s.sideTagline}>Poder absoluto</span>
            </button>
          </div>
        </section>

        {/* Mode selector */}
        <section className={s.modeSection}>
          <div className={s.sideLabel}>MODO DE JUEGO</div>
          <div className={s.modes}>
            <button
              className={`${s.modeBtn} ${mode === 'survival' ? s.modeActive : ''}`}
              onClick={() => setMode('survival')}
            >
              <span className={s.modeMoji}>🛡️</span>
              <span className={s.modeName}>SUPERVIVENCIA</span>
              <span className={s.modeDesc}>5 oleadas · Giroscopio</span>
            </button>
            <button
              className={`${s.modeBtn} ${mode === 'slash' ? s.modeActive : ''}`}
              onClick={() => setMode('slash')}
            >
              <span className={s.modeMoji}>⚔️</span>
              <span className={s.modeName}>MODO SABLE</span>
              <span className={s.modeDesc}>Corta todo · Sin límite</span>
            </button>
          </div>
        </section>

        {/* How to play */}
        <section className={s.howTo}>
          <div className={s.tabs}>
            <button
              className={`${s.tab} ${tab === 'play' ? s.tabActive : ''}`}
              onClick={() => setTab('play')}
            >Cómo jugar</button>
            <button
              className={`${s.tab} ${tab === 'enemies' ? s.tabActive : ''}`}
              onClick={() => setTab('enemies')}
            >{mode === 'slash' ? 'Objetos' : 'Enemigos'}</button>
            {mode !== 'slash' && (
              <button
                className={`${s.tab} ${tab === 'waves' ? s.tabActive : ''}`}
                onClick={() => setTab('waves')}
              >Oleadas</button>
            )}
          </div>

          {tab === 'play' && (
            <div className={s.cards}>
              {(mode === 'slash' ? HOW_TO_SLASH : HOW_TO).map((item, i) => (
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
              {(mode === 'slash' ? SLASH_OBJECTS : ENEMIES).map((e, i) => (
                <div key={e.name} className={s.enemyCard} style={{ animationDelay: `${i * 0.06}s` }}>
                  <span className={s.enemyEmoji}>{e.emoji}</span>
                  <div className={s.enemyName}>{e.name}</div>
                  <div className={s.enemyDetail}>{e.detail}</div>
                  {e.note && <div className={s.enemyNote}>{e.note}</div>}
                </div>
              ))}
            </div>
          )}

          {tab === 'waves' && mode !== 'slash' && (
            <div className={s.waveList}>
              {[
                ['OLA 1', 'La Fuerza Despierta',  '6 kills',  'Droides y Stormtroopers'],
                ['OLA 2', 'Tropas Imperiales',     '10 kills', 'Mayor velocidad'],
                ['OLA 3', 'Guardias Oscuros',      '14 kills', 'TIE Fighters y Élites aparecen'],
                ['OLA 4', 'El Imperio Avanza',     '18 kills', 'Disparos más rápidos'],
                ['OLA 5', 'Batalla Final',         '22 kills', 'Dificultad máxima'],
              ].map(([wave, name, kills, note], i) => (
                <div key={wave} className={s.waveRow} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className={s.waveNum}>{wave}</div>
                  <div className={s.waveInfo}>
                    <span className={s.waveName}>{name}</span>
                    <span className={s.waveNote}>{kills} · {note}</span>
                  </div>
                </div>
              ))}
              <div className={s.waveTip}>+20 HP al completar cada ola</div>
            </div>
          )}
        </section>

        {/* Controls + Start */}
        <footer className={s.footer}>
          {mode !== 'slash' && (
            <div className={s.ctrlRow}>
              <button className={s.gyroBtn} onClick={handleActivate} disabled={detecting}>
                {detecting ? 'Detectando…' : '📡 Activar Giroscopio'}
              </button>
              <div className={`${s.pill} ${pill.cls}`}>{pill.text}</div>
            </div>
          )}

          <button className={s.startBtn} onClick={handleStart} disabled={!canStart}>
            {canStart
              ? (mode === 'slash'
                  ? `MODO SABLE · ${side === 'jedi' ? 'JEDI' : 'SITH'}`
                  : `SUPERVIVENCIA · ${side === 'jedi' ? 'JEDI' : 'SITH'}`)
              : 'COMENZAR'}
          </button>

          {!side && <p className={s.hint}>Elige tu bando para continuar</p>}
          {side && !mode && <p className={s.hint}>Elige un modo de juego para continuar</p>}
          {side && mode === 'survival' && ctrlMode === 0 && <p className={s.hint}>Activa el giroscopio para continuar</p>}
        </footer>
      </div>
    </div>
  )
}
