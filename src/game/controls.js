let calX = 0, calY = 0, calibrated = false
let motionHandler = null, orientHandler = null

function probeEvent(name, ms, extractor) {
  return new Promise(resolve => {
    const h = (e) => {
      const val = extractor(e)
      if (val != null) {
        window.removeEventListener(name, h, true)
        resolve(val)
      }
    }
    window.addEventListener(name, h, true)
    setTimeout(() => {
      window.removeEventListener(name, h, true)
      resolve(null)
    }, ms)
  })
}

function setupMotion(store) {
  motionHandler = (e) => {
    const rx = e.accelerationIncludingGravity?.x ?? 0
    const ry = e.accelerationIncludingGravity?.y ?? 0
    if (!calibrated) { calX = rx; calY = ry; calibrated = true }
    store.setTilt((rx - calX) * 0.09, -(ry - calY) * 0.09)
  }
  window.addEventListener('devicemotion', motionHandler)
  store.setCtrlMode(1)
}

function setupOrientation(store) {
  orientHandler = (e) => {
    const rx = e.gamma ?? 0
    const ry = (e.beta ?? 45) - 45
    if (!calibrated) { calX = rx; calY = ry; calibrated = true }
    store.setTilt((rx - calX) * 0.045, (ry - calY) * 0.045)
  }
  window.addEventListener('deviceorientation', orientHandler)
  store.setCtrlMode(2)
}

export async function tryActivateControls(store) {
  // Layer 1: DeviceMotion + permission (iOS 13+)
  if (typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const perm = await DeviceMotionEvent.requestPermission()
      if (perm === 'granted') {
        setupMotion(store)
        return
      }
    } catch (_) {}
  }

  // Layer 2: DeviceMotion without permission (Android)
  const motionVal = await probeEvent(
    'devicemotion', 800,
    e => e.accelerationIncludingGravity?.x
  )
  if (motionVal !== null) {
    setupMotion(store)
    return
  }

  // Layer 3: DeviceOrientation
  const orientVal = await probeEvent('deviceorientation', 800, e => e.gamma)
  if (orientVal !== null) {
    setupOrientation(store)
    return
  }

  // Layer 4: Virtual joystick
  store.setCtrlMode(3)
}

export function recalibrate() {
  calibrated = false
}

export function stopControls() {
  if (motionHandler) {
    window.removeEventListener('devicemotion', motionHandler)
    motionHandler = null
  }
  if (orientHandler) {
    window.removeEventListener('deviceorientation', orientHandler)
    orientHandler = null
  }
}
