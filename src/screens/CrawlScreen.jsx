import { useState, useEffect, useRef, useCallback } from 'react'
import s from './CrawlScreen.module.css'

const CRAWL = [
  {
    type: 'title',
    ep:   'EPISODIO I',
    name: 'UNA NUEVA AMENAZA',
  },
  {
    type: 'p',
    text: 'El Imperio Galáctico extiende su dominio de oscuridad por todos los rincones de la galaxia. Sus legiones de droides, stormtroopers y cazas TIE avanzan sin descanso, aplastando toda resistencia en su camino.',
  },
  {
    type: 'p',
    text: 'Los últimos defensores de la República caen uno a uno. La esperanza parpadea como una vela en el vacío del espacio.',
  },
  {
    type: 'p',
    text: 'En el caos de la batalla, un guerrero solitario emerge de las sombras. Armado únicamente con su sable de luz y guiado por la Fuerza que corre por sus venas, acepta el desafío más difícil de su vida.',
  },
  {
    type: 'highlight',
    text: 'CINCO OLEADAS de tropas imperiales se lanzan en su contra.',
  },
  {
    type: 'p',
    text: 'Jedi o Sith, el destino de la galaxia depende de un solo guerrero. El tiempo se agota.',
  },
  {
    type: 'p',
    text: '¿Tienes suficiente Fuerza para sobrevivir?',
  },
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

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      sz: 0.3 + Math.random() * 1.6,
      speed: 0.1 + Math.random() * 0.3,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.01 + Math.random() * 0.025,
    }))

    const loop = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach(st => {
        st.y += st.speed
        st.twinkle += st.twinkleSpeed
        if (st.y > canvas.height) { st.y = 0; st.x = Math.random() * canvas.width }
        ctx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(st.twinkle))
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

export default function CrawlScreen({ onDone }) {
  const [phase, setPhase] = useState(0) // 0: "Hace mucho tiempo" | 1: crawl
  const canvasRef  = useRef(null)
  const doneRef    = useRef(false)
  useStarfield(canvasRef)

  const skip = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    onDone()
  }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 4200)
    const t2 = setTimeout(skip, 27000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [skip])

  return (
    <div className={s.screen} onClick={skip}>
      {/* Stars — always rendering, opacity controlled by phase */}
      <canvas
        ref={canvasRef}
        className={`${s.stars} ${phase === 1 ? s.starsVisible : ''}`}
      />

      {/* Phase 0: "Hace mucho tiempo..." */}
      <div className={`${s.longAgo} ${phase === 0 ? s.longAgoVisible : ''}`}>
        Hace mucho tiempo, en una galaxia<br />muy, muy lejana...
      </div>

      {/* Phase 1: crawl */}
      {phase === 1 && (
        <>
          {/* Gradient fade at top — text disappears into space */}
          <div className={s.topFade} />

          <div className={s.crawlOuter}>
            <div className={s.crawlInner}>
              {CRAWL.map((block, i) => {
                if (block.type === 'title') return (
                  <div key={i} className={s.crawlTitle}>
                    <div className={s.crawlEp}>{block.ep}</div>
                    <div className={s.crawlName}>{block.name}</div>
                    <div className={s.crawlRule} />
                  </div>
                )
                if (block.type === 'highlight') return (
                  <p key={i} className={s.crawlHighlight}>{block.text}</p>
                )
                return <p key={i} className={s.crawlP}>{block.text}</p>
              })}
            </div>
          </div>
        </>
      )}

      <button className={s.skip} onClick={(e) => { e.stopPropagation(); skip() }}>
        Saltar ›
      </button>
    </div>
  )
}
