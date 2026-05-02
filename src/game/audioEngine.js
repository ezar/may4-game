// Synthesized audio — no external files required

let ctx = null, masterGain = null, musicGain = null, musicTimer = null

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.32
    masterGain.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function createNoise(sec) {
  const a = ac()
  const n = Math.ceil(a.sampleRate * sec)
  const buf = a.createBuffer(1, n, a.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
  const src = a.createBufferSource()
  src.buffer = buf
  return src
}

function chain(...nodes) {
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1])
}

// ── Sound Effects ────────────────────────────────────────────────────────────

export function playSlash() {
  const a = ac()
  const t = a.currentTime
  const src = createNoise(0.11)
  const bf = a.createBiquadFilter()
  bf.type = 'bandpass'
  bf.frequency.setValueAtTime(2800, t)
  bf.frequency.exponentialRampToValueAtTime(9000, t + 0.1)
  bf.Q.value = 2.5
  const g = a.createGain()
  g.gain.setValueAtTime(0.28, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.11)
  chain(src, bf, g, masterGain)
  src.start(t)
  src.stop(t + 0.11)
}

export function playCut(combo = 1) {
  const a = ac()
  const t = a.currentTime
  const freq = 480 + combo * 65
  const o = a.createOscillator()
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(freq * 2, t)
  o.frequency.exponentialRampToValueAtTime(freq * 0.75, t + 0.16)
  const f = a.createBiquadFilter()
  f.type = 'lowpass'
  f.frequency.value = 2400
  const g = a.createGain()
  g.gain.setValueAtTime(0.42, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
  chain(o, f, g, masterGain)
  o.start(t)
  o.stop(t + 0.18)
  if (combo >= 3) {
    ;[523.25, 659.25, 783.99].forEach((hz, i) => {
      const st = t + i * 0.055
      const so = a.createOscillator()
      so.frequency.value = hz * (1 + (combo - 3) * 0.03)
      const sg = a.createGain()
      sg.gain.setValueAtTime(0.13, st)
      sg.gain.exponentialRampToValueAtTime(0.001, st + 0.11)
      chain(so, sg, masterGain)
      so.start(st)
      so.stop(st + 0.11)
    })
  }
}

export function playBomb() {
  const a = ac()
  const t = a.currentTime
  const o = a.createOscillator()
  o.frequency.setValueAtTime(110, t)
  o.frequency.exponentialRampToValueAtTime(18, t + 0.5)
  const g = a.createGain()
  g.gain.setValueAtTime(0.85, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
  chain(o, g, masterGain)
  o.start(t)
  o.stop(t + 0.5)
  const ns = createNoise(0.3)
  const nf = a.createBiquadFilter()
  nf.type = 'lowpass'
  nf.frequency.value = 550
  const ng = a.createGain()
  ng.gain.setValueAtTime(0.65, t)
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
  chain(ns, nf, ng, masterGain)
  ns.start(t)
  ns.stop(t + 0.3)
}

export function playLoseLife() {
  const a = ac()
  const t = a.currentTime
  ;[392, 349.23, 311.13, 261.63].forEach((hz, i) => {
    const st = t + i * 0.13
    const o = a.createOscillator()
    o.frequency.value = hz
    const g = a.createGain()
    g.gain.setValueAtTime(0.22, st)
    g.gain.exponentialRampToValueAtTime(0.001, st + 0.22)
    chain(o, g, masterGain)
    o.start(st)
    o.stop(st + 0.22)
  })
}

export function playGameOver() {
  const a = ac()
  const t = a.currentTime
  // Imperial March descending phrase (game-over fanfare)
  ;[196.00, 155.56, 233.08, 196.00].forEach((hz, i) => {
    const st = t + i * 0.28
    const o = a.createOscillator()
    o.type = 'sawtooth'
    o.frequency.value = hz
    const f = a.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.setValueAtTime(300, st)
    f.frequency.exponentialRampToValueAtTime(1000, st + 0.06)
    const g = a.createGain()
    g.gain.setValueAtTime(0, st)
    g.gain.linearRampToValueAtTime(0.5, st + 0.06)
    g.gain.exponentialRampToValueAtTime(0.001, st + 0.55)
    chain(o, f, g, masterGain)
    o.start(st)
    o.stop(st + 0.6)
  })
}

// ── Imperial March — synthesized (John Williams, arranged for Web Audio) ──────
// Using actual melody notes for recognizable Star Wars feel.
// Synthesized performance ≠ the original recording.

const BPM = 103
const Q   = 60 / BPM   // ≈ 0.583 s per quarter-note

// ── SECTION A — main march motif (beats 0–17, ≈9.9 s) ───────────────────────

const MARCH_MELODY = [
  // Phrase 1
  [196.00, Q,      Q * 0   ],  // G3
  [196.00, Q,      Q * 1   ],  // G3
  [196.00, Q,      Q * 2   ],  // G3
  [155.56, Q*1.5,  Q * 3   ],  // Eb3 (dotted ♩)
  [233.08, Q*0.5,  Q * 4.5 ],  // Bb3 (♪)
  [196.00, Q*2,    Q * 5   ],  // G3  (half)
  // Phrase 2
  [293.66, Q,      Q * 7   ],  // D4
  [293.66, Q,      Q * 8   ],  // D4
  [293.66, Q,      Q * 9   ],  // D4
  [311.13, Q*1.5,  Q * 10  ],  // Eb4 (dotted ♩)
  [233.08, Q*0.5,  Q * 11.5],  // Bb3 (♪)
  [185.00, Q,      Q * 12  ],  // Gb3
  [155.56, Q*1.5,  Q * 13  ],  // Eb3 (dotted ♩)
  [233.08, Q*0.5,  Q * 14.5],  // Bb3 (♪)
  [196.00, Q*2,    Q * 15  ],  // G3  (half)
]

const MARCH_BASS = [
  [ 98.00, Q,      Q * 0   ],  // G2
  [ 98.00, Q,      Q * 1   ],
  [ 98.00, Q,      Q * 2   ],
  [ 77.78, Q*1.5,  Q * 3   ],  // Eb2
  [116.54, Q*0.5,  Q * 4.5 ],  // Bb2
  [ 98.00, Q*2,    Q * 5   ],  // G2
  [146.83, Q,      Q * 7   ],  // D3
  [146.83, Q,      Q * 8   ],
  [146.83, Q,      Q * 9   ],
  [155.56, Q*1.5,  Q * 10  ],  // Eb3
  [116.54, Q*0.5,  Q * 11.5],  // Bb2
  [ 92.50, Q,      Q * 12  ],  // Gb2
  [ 77.78, Q*1.5,  Q * 13  ],  // Eb2
  [116.54, Q*0.5,  Q * 14.5],  // Bb2
  [ 98.00, Q*2,    Q * 15  ],  // G2
]

const MARCH_DRUMS = [
  {hz:  98.00, beat:  0   },
  {hz:  77.78, beat:  3   },
  {hz: 116.54, beat:  4.5 },
  {hz:  98.00, beat:  5   },
  {hz: 146.83, beat:  7   },
  {hz: 155.56, beat: 10   },
  {hz: 116.54, beat: 11.5 },
  {hz:  92.50, beat: 12   },
  {hz:  77.78, beat: 13   },
  {hz:  98.00, beat: 15   },
]

// ── SECTION B — secondary theme, higher brass (beats 17–35, ≈10.5 s) ─────────
// G4 → F#4 → F4 → descending phrase → G4 resolution

const B = Q * 17   // section B time offset

const MARCH_B_MELODY = [
  [392.00, Q*1.5,  B + Q * 0   ],  // G4  (dotted ♩)
  [293.66, Q*0.5,  B + Q * 1.5 ],  // D4  (♪)
  [392.00, Q*2,    B + Q * 2   ],  // G4  (half)
  [369.99, Q*1.5,  B + Q * 4   ],  // F#4 (dotted ♩)
  [293.66, Q*0.5,  B + Q * 5.5 ],  // D4  (♪)
  [369.99, Q*2,    B + Q * 6   ],  // F#4 (half)
  [349.23, Q*1.5,  B + Q * 8   ],  // F4  (dotted ♩)
  [277.18, Q*0.5,  B + Q * 9.5 ],  // Db4 (♪)
  [349.23, Q,      B + Q * 10  ],  // F4  (♩)
  [329.63, Q,      B + Q * 11  ],  // E4  (♩)
  [311.13, Q*0.5,  B + Q * 12  ],  // Eb4 (♪)
  [233.08, Q*0.5,  B + Q * 12.5],  // Bb3 (♪)
  [293.66, Q,      B + Q * 13  ],  // D4  (♩)
  [369.99, Q,      B + Q * 14  ],  // Gb4 (♩)
  [466.16, Q,      B + Q * 15  ],  // Bb4 (♩)
  [392.00, Q*2,    B + Q * 16  ],  // G4  (half) — resolves to A'
]

const MARCH_B_BASS = [
  [ 98.00, Q*1.5,  B + Q * 0   ],  // G2
  [ 73.42, Q*0.5,  B + Q * 1.5 ],  // D2
  [ 98.00, Q*2,    B + Q * 2   ],  // G2
  [ 92.50, Q*1.5,  B + Q * 4   ],  // F#2/Gb2
  [ 73.42, Q*0.5,  B + Q * 5.5 ],  // D2
  [ 92.50, Q*2,    B + Q * 6   ],  // F#2
  [ 87.31, Q*1.5,  B + Q * 8   ],  // F2
  [ 69.30, Q*0.5,  B + Q * 9.5 ],  // Db2
  [ 87.31, Q,      B + Q * 10  ],  // F2
  [ 82.41, Q,      B + Q * 11  ],  // E2
  [ 77.78, Q*0.5,  B + Q * 12  ],  // Eb2
  [ 58.27, Q*0.5,  B + Q * 12.5],  // Bb1
  [ 73.42, Q,      B + Q * 13  ],  // D2
  [ 92.50, Q,      B + Q * 14  ],  // Gb2
  [116.54, Q,      B + Q * 15  ],  // Bb2
  [ 98.00, Q*2,    B + Q * 16  ],  // G2
]

const MARCH_B_DRUMS = [
  {hz:  98.00, beat: 17   },
  {hz:  98.00, beat: 19   },
  {hz:  92.50, beat: 21   },
  {hz:  92.50, beat: 23   },
  {hz:  87.31, beat: 25   },
  {hz:  73.42, beat: 27   },
  {hz:  77.78, beat: 29   },
  {hz:  98.00, beat: 33   },
]

// ── SECTION A' — main motif reprise (beats 35–52, ≈9.9 s) ───────────────────

const A2 = Q * 35   // section A' time offset

const MARCH_A2_MELODY = MARCH_MELODY.map(([hz, dur, at]) => [hz, dur, at + A2])
const MARCH_A2_BASS   = MARCH_BASS.map(([hz, dur, at])   => [hz, dur, at + A2])
const MARCH_A2_DRUMS  = MARCH_DRUMS.map(({ hz, beat })   => ({ hz, beat: beat + 35 }))

// ── Total loop: 17 + 18 + 17 = 52 beats ≈ 30.3 s ───────────────────────────
const LOOP_DUR = Q * 52

// Brass voice: dual detuned sawtooth → lowpass filter with opening attack
function brass(hz, dur, t, dest, vol = 0.22) {
  const a = ac()
  const o1 = a.createOscillator()
  const o2 = a.createOscillator()
  o1.type = o2.type = 'sawtooth'
  o1.frequency.value = hz
  o2.frequency.value = hz * 1.007   // slight chorus

  const filt = a.createBiquadFilter()
  filt.type = 'lowpass'
  filt.Q.value = 1.8
  filt.frequency.setValueAtTime(180, t)
  filt.frequency.exponentialRampToValueAtTime(2000, t + 0.07)
  filt.frequency.linearRampToValueAtTime(1100, t + 0.22)

  const g = a.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(vol, t + 0.06)
  g.gain.setValueAtTime(vol * 0.78, t + Math.max(0.08, dur - 0.07))
  g.gain.linearRampToValueAtTime(0, t + dur)

  const mix = a.createGain()
  mix.gain.value = 0.5
  o1.connect(mix)
  o2.connect(mix)
  chain(mix, filt, g, dest)
  o1.start(t); o1.stop(t + dur + 0.04)
  o2.start(t); o2.stop(t + dur + 0.04)
}

// Bass voice: sawtooth, tight lowpass
function bass(hz, dur, t, dest) {
  const a = ac()
  const o = a.createOscillator()
  o.type = 'sawtooth'
  o.frequency.value = hz
  const filt = a.createBiquadFilter()
  filt.type = 'lowpass'
  filt.frequency.value = 380
  const g = a.createGain()
  g.gain.setValueAtTime(0, t)
  g.gain.linearRampToValueAtTime(0.32, t + 0.04)
  g.gain.setValueAtTime(0.22, t + Math.max(0.05, dur - 0.05))
  g.gain.linearRampToValueAtTime(0, t + dur)
  chain(o, filt, g, dest)
  o.start(t); o.stop(t + dur + 0.04)
}

// Timpani: pitch-bent sine + short noise transient
function timpani(hz, t, dest) {
  const a = ac()
  const o = a.createOscillator()
  o.type = 'sine'
  o.frequency.setValueAtTime(hz * 1.7, t)
  o.frequency.exponentialRampToValueAtTime(hz, t + 0.09)
  const g = a.createGain()
  g.gain.setValueAtTime(0.55, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.75)
  chain(o, g, dest)
  o.start(t); o.stop(t + 0.75)

  const ns = createNoise(0.03)
  const nf = a.createBiquadFilter()
  nf.type = 'bandpass'; nf.frequency.value = 350; nf.Q.value = 2.5
  const ng = a.createGain()
  ng.gain.setValueAtTime(0.28, t)
  ng.gain.exponentialRampToValueAtTime(0.001, t + 0.03)
  chain(ns, nf, ng, dest)
  ns.start(t); ns.stop(t + 0.03)
}

function scheduleLoop(t0, dest) {
  // Section A — main march motif
  MARCH_MELODY.forEach(([hz, dur, at]) => brass(hz, dur, t0 + at, dest))
  MARCH_BASS.forEach(([hz, dur, at])   => bass(hz, dur, t0 + at, dest))
  MARCH_DRUMS.forEach(({hz, beat})     => timpani(hz, t0 + beat * Q, dest))

  // Section B — secondary theme (upper register)
  MARCH_B_MELODY.forEach(([hz, dur, at]) => brass(hz, dur, t0 + at, dest, 0.20))
  MARCH_B_BASS.forEach(([hz, dur, at])   => bass(hz, dur, t0 + at, dest))
  MARCH_B_DRUMS.forEach(({hz, beat})     => timpani(hz, t0 + beat * Q, dest))

  // Section A' — main motif reprise
  MARCH_A2_MELODY.forEach(([hz, dur, at]) => brass(hz, dur, t0 + at, dest))
  MARCH_A2_BASS.forEach(([hz, dur, at])   => bass(hz, dur, t0 + at, dest))
  MARCH_A2_DRUMS.forEach(({hz, beat})     => timpani(hz, t0 + beat * Q, dest))
}

export function startMusic() {
  const a = ac()
  stopMusic()
  musicGain = a.createGain()
  musicGain.gain.setValueAtTime(0, a.currentTime)
  musicGain.gain.linearRampToValueAtTime(1, a.currentTime + 1.5)
  musicGain.connect(masterGain)

  let next = a.currentTime + 0.06
  function tick() {
    scheduleLoop(next, musicGain)
    next += LOOP_DUR
    musicTimer = setTimeout(tick, (LOOP_DUR - 0.8) * 1000)
  }
  tick()
}

export function resumeAudio() { ac() }

export function stopMusic() {
  clearTimeout(musicTimer)
  musicTimer = null
  if (!musicGain) return
  const a = ac()
  const g = musicGain
  g.gain.setValueAtTime(g.gain.value, a.currentTime)
  g.gain.linearRampToValueAtTime(0, a.currentTime + 0.8)
  setTimeout(() => { try { g.disconnect() } catch (_) {} }, 1000)
  musicGain = null
}
