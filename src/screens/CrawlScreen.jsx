import { useState, useEffect, useRef, useCallback } from 'react'
import { useT } from '../i18n/index.js'
import s from './CrawlScreen.module.css'

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
  const t = useT()
  const [phase, setPhase] = useState(0)
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
    const t2 = setTimeout(skip, 44000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [skip])

  return (
    <div className={s.screen} onClick={skip}>
      <canvas
        ref={canvasRef}
        className={`${s.stars} ${phase === 1 ? s.starsVisible : ''}`}
      />

      <div className={`${s.longAgo} ${phase === 0 ? s.longAgoVisible : ''}`}>
        {t.crawl.longAgo.split('\n').map((line, i) => (
          <span key={i}>{line}{i < t.crawl.longAgo.split('\n').length - 1 && <br />}</span>
        ))}
      </div>

      {phase === 1 && (
        <>
          <div className={s.topFade} />

          <div className={s.crawlOuter}>
            <div className={s.crawlInner}>
              {t.crawl.blocks.map((block, i) => {
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
        {t.crawl.skip}
      </button>
    </div>
  )
}
