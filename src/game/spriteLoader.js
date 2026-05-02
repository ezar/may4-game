const SPRITE_PATHS = {
  '🤖': 'sprites/droid.svg',
  '👾': 'sprites/trooper.svg',
  '🛸': 'sprites/tie.svg',
  '💀': 'sprites/elite.svg',
  '💣': 'sprites/bomb.svg',
}

const _sprites = {}

export function getSprites() { return _sprites }

export function loadSprites() {
  const base = import.meta.env.BASE_URL ?? '/'
  return Promise.all(
    Object.entries(SPRITE_PATHS).map(([emoji, path]) =>
      new Promise(resolve => {
        const img = new Image()
        img.onload  = () => { _sprites[emoji] = img; resolve() }
        img.onerror = () => resolve()   // fall back to canvas shapes silently
        img.src = base + path
      })
    )
  )
}
