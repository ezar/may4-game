# May The 4th ⚔️

Juego arcade de supervivencia mobile ambientado en Star Wars para el **4 de mayo**. Controla a tu personaje Jedi o Sith inclinando el móvil, deflecta disparos con un toque y desata el Force Blast cuando la Fuerza llegue al 100%.

🎮 **[Jugar ahora →](https://ezar.github.io/may4-game/)**

---

## Cómo jugar

| Acción | Control |
|--------|---------|
| Mover personaje | Inclina el móvil |
| Deflectar disparos | Toca cerca de una bala |
| Force Blast | Toca cuando la Fuerza esté al 100% |

### Enemigos

| Enemigo | HP | Puntos | Especial |
|---------|----|--------|----------|
| Droide 🤖 | 1 | 10 | — |
| Stormtrooper 👾 | 2 | 20 | Barra de HP |
| TIE Fighter 🛸 | 1 | 15 | Movimiento en zigzag |
| Guardia Élite 💀 | 3 | 40 | Barra de HP |

### Oleadas

El juego tiene **5 oleadas** de dificultad progresiva. Entre oleadas recuperas 20 HP. Completa las 5 para ganar.

### Barra de Fuerza

Cada enemigo eliminado carga la barra de Fuerza un 13%. Al llegar al 100%, el siguiente toque activa el **Force Blast**: destruye todos los enemigos en pantalla con un anillo expansivo.

---

## Stack técnico

- **Vite** — bundler
- **React 18** — UI y pantallas
- **Zustand** — estado global
- **HTML5 Canvas** — renderizado del juego (doble canvas: estrellas + gameplay)
- **CSS Modules** — estilos por componente
- **Google Fonts** — Orbitron + Exo 2

### Estructura

```
src/
  game/
    engine.js      ← game loop, física, colisiones
    entities.js    ← factories: Enemy, Bullet, Particle, Ring
    renderer.js    ← funciones puras de canvas
    controls.js    ← giroscopio con 4 capas de fallback
    waves.js       ← configuración de oleadas y enemigos
  store/
    gameStore.js   ← Zustand store
  screens/
    IntroScreen    ← selector de bando + activar giroscopio
    GameScreen     ← canvas + HUD
    EndScreen      ← victoria / derrota + puntuación
  components/
    HUD            ← vida, score, fuerza, oleada
    Joystick       ← joystick virtual (fallback táctil)
    WaveBanner     ← banner animado entre oleadas
    ForceReady     ← indicador Force Blast disponible
```

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/may4-game/` en el navegador.

Para probar en móvil desde el mismo ordenador:

```bash
npm run dev -- --host
```

Luego accede con la IP local desde el móvil.

---

## Deploy

El proyecto se despliega automáticamente en GitHub Pages al hacer push a `main`.

```bash
npm run build   # genera dist/
```

---

## Controles — detección automática

El botón "Activar Giroscopio" detecta el mejor control disponible en este orden:

1. **DeviceMotion + permiso** (iOS 13+) — máxima precisión
2. **DeviceMotion sin permiso** (Android) — detección automática
3. **DeviceOrientation** — fallback orientación
4. **Joystick virtual** — si no hay sensor disponible

May the 4th be with you. 🌟
