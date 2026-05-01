// Synthesized audio — no external files required

let ctx = null, masterGain = null, musicGain = null, musicTimer = null

function ac() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.42
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
  ;[185.00, 164.81, 155.56, 130.81].forEach((hz, i) => {
    const st = t + i * 0.3
    const o = a.createOscillator()
    o.type = 'sawtooth'
    o.frequency.value = hz
    const f = a.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 900
    const g = a.createGain()
    g.gain.setValueAtTime(0.5, st)
    g.gain.exponentialRampToValueAtTime(0.001, st + 0.45)
    chain(o, f, g, masterGain)
    o.start(st)
    o.stop(st + 0.45)
  })
}

// ── Background Music ─────────────────────────────────────────────────────────

const BPM = 108
const SPB = 60 / BPM  // seconds per beat

// Am → Am → Dm → Em (original composition)
const CHORDS = [
  [110.00, 130.81, 164.81],  // Am: A2 C3 E3
  [110.00, 130.81, 164.81],  // Am
  [146.83, 174.61, 220.00],  // Dm: D3 F3 A3
  [164.81, 196.00, 246.94],  // Em: E3 G3 B3
]

// Original melody — A minor, 16 beats
const MELODY = [
  [440.00, 0.5,  0  ],  // A4
  [523.25, 0.5,  0.5],  // C5
  [659.25, 1.5,  1  ],  // E5
  [587.33, 0.5,  2.5],  // D5
  [523.25, 1.0,  3  ],  // C5
  [440.00, 1.5,  4  ],  // A4
  [392.00, 0.5,  5.5],  // G4
  [440.00, 1.0,  6  ],  // A4
  [523.25, 1.0,  7  ],  // C5
  [587.33, 0.5,  8  ],  // D5
  [659.25, 0.5,  8.5],  // E5
  [587.33, 1.0,  9  ],  // D5
  [523.25, 0.5,  10 ],  // C5
  [440.00, 0.5,  10.5], // A4
  [392.00, 2.0,  11 ],  // G4
  [440.00, 0.5,  13 ],  // A4
  [523.25, 0.5,  13.5], // C5
  [659.25, 0.5,  14 ],  // E5
  [698.46, 0.5,  14.5], // F5
  [659.25, 1.0,  15 ],  // E5
]

const LOOP_DUR = 16 * SPB

function scheduleLoop(t0, dest) {
  const a = ac()

  for (let bar = 0; bar < 4; bar++) {
    // Kick on beat 1 of each bar
    const kt = t0 + bar * 4 * SPB
    const ko = a.createOscillator()
    ko.frequency.setValueAtTime(140, kt)
    ko.frequency.exponentialRampToValueAtTime(32, kt + 0.22)
    const kg = a.createGain()
    kg.gain.setValueAtTime(0.55, kt)
    kg.gain.exponentialRampToValueAtTime(0.001, kt + 0.28)
    chain(ko, kg, dest)
    ko.start(kt)
    ko.stop(kt + 0.28)

    // Snare on beat 3 of each bar
    const snt = t0 + (bar * 4 + 2) * SPB
    const sns = createNoise(0.14)
    const snf = a.createBiquadFilter()
    snf.type = 'highpass'
    snf.frequency.value = 2000
    const sng = a.createGain()
    sng.gain.setValueAtTime(0.11, snt)
    sng.gain.exponentialRampToValueAtTime(0.001, snt + 0.11)
    chain(sns, snf, sng, dest)
    sns.start(snt)
    sns.stop(snt + 0.14)
  }

  CHORDS.forEach((freqs, ci) => {
    const t = t0 + ci * 4 * SPB
    const dur = 4 * SPB
    freqs.forEach(hz => {
      const o = a.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = hz
      const f = a.createBiquadFilter()
      f.type = 'lowpass'
      f.frequency.value = 520
      f.Q.value = 0.9
      const g = a.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.038, t + 0.2)
      g.gain.setValueAtTime(0.038, t + dur - 0.12)
      g.gain.linearRampToValueAtTime(0, t + dur)
      chain(o, f, g, dest)
      o.start(t)
      o.stop(t + dur)
    })
  })

  MELODY.forEach(([hz, durB, delB]) => {
    const t = t0 + delB * SPB
    const dur = durB * SPB
    const o = a.createOscillator()
    o.type = 'square'
    o.frequency.value = hz
    const f = a.createBiquadFilter()
    f.type = 'lowpass'
    f.frequency.value = 1500
    const g = a.createGain()
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.065, t + 0.02)
    g.gain.setValueAtTime(0.06, t + Math.max(0.02, dur - 0.04))
    g.gain.linearRampToValueAtTime(0, t + dur)
    chain(o, f, g, dest)
    o.start(t)
    o.stop(t + dur)
  })
}

export function startMusic() {
  const a = ac()
  stopMusic()
  musicGain = a.createGain()
  musicGain.gain.setValueAtTime(0, a.currentTime)
  musicGain.gain.linearRampToValueAtTime(1, a.currentTime + 2.5)
  musicGain.connect(masterGain)

  let next = a.currentTime + 0.06
  function tick() {
    scheduleLoop(next, musicGain)
    next += LOOP_DUR
    musicTimer = setTimeout(tick, (LOOP_DUR - 0.8) * 1000)
  }
  tick()
}

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
