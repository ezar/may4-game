# May The 4th ⚔️

Juego arcade de acción para el **Star Wars Day (4 de mayo)**. Elige bando, selecciona modo de juego y defiéndete de las tropas imperiales con tu sable de luz.

🎮 **[Jugar ahora →](https://ezar.github.io/may4-game/)**

---

## Modos de juego

| Modo | Descripción | Control |
|------|-------------|----------|
| **Supervivencia** | 5 oleadas con dificultad progresiva. Completa las 5 para ganar. | Giroscopio / Joystick |
| **Modo Sable** | Corta objetos deslizando el dedo. 3 vidas, sin límite de tiempo. | Táctil (deslizar) |
| **Modo Infinito** | Oleadas sin fin, puntuación máxima. | Giroscopio / Joystick |
| **Maestro del Sable** | 60 segundos para acumular la mayor puntuación posible. | Táctil (deslizar) |

En todos los modos eliges tu bando: **Jedi** (azul) o **Sith** (rojo). Cada uno tiene rangos, quotes y colores propios.

---

## Cómo jugar

### Supervivencia / Infinito

| Acción | Control |
|--------|----------|
| Mover personaje | Inclina el móvil (giroscopio) o usa el joystick virtual |
| Deflectar disparo | Toca cerca de una bala enemiga |
| Force Blast | Toca la pantalla cuando la barra de Fuerza esté al 100% |

La **barra de Fuerza** se carga con cada kill (~13% por enemigo). Al llegar al 100% se activa el Force Blast: un anillo expansivo que destruye todo lo que haya en pantalla.

Los **combos** (kills rápidos consecutivos) multiplican la puntuación.

### Modo Sable / Maestro

| Acción | Control |
|--------|----------|
| Cortar objetos | Desliza el dedo rápido por encima |
| Evitar bombas | **No cortes** los detonadores térmicos 💣 |

En **Modo Sable** pierdes una vida si cortas una bomba o dejas escapar un objeto.
En **Maestro** las bombas restan 5 segundos del temporizador.

---

## Enemigos

| Sprite | Nombre | HP | Puntos | Especial |
|--------|--------|----|--------|----------|
| 🤖 | Droide B1 | 1 | 10 | — |
| 👾 | Stormtrooper | 2 | 20 | Barra de HP |
| 🛸 | Caza TIE | 1 | 15 | Movimiento en zigzag |
| 💀 | Death Trooper | 3 | 40 | Aparece en oleada 3+ |
| 💣 | Detonador Térmico | — | −1 vida | ¡No cortar! (Modo Sable) |

Los sprites son SVG propios en `/public/sprites/`.

---

## Oleadas (Supervivencia)

| Oleada | Localización | Objetivo | Nota |
|--------|--------------|----------|---------|
| 1 | Geonosis | 6 kills | Droides y Stormtroopers |
| 2 | Kamino | 10 kills | Mayor velocidad |
| 3 | Hoth | 14 kills | Aparecen Cazas TIE y Death Troopers |
| 4 | Bespin | 18 kills | Disparos más rápidos |
| 5 | Estrella de la Muerte | 22 kills | Dificultad máxima |

Completar cada oleada recupera 20 HP. Una animación de hyperspace separa cada oleada.

---

## Controles — detección automática

El botón **"Activar Giroscopio"** detecta el mejor sensor disponible en este orden:

1. **DeviceMotion + permiso** (iOS 13+) — máxima precisión
2. **DeviceMotion sin permiso** (Android) — detección directa
3. **DeviceOrientation** — fallback de orientación
4. **Joystick virtual** — si no hay sensor disponible

También puedes activar el joystick virtual directamente con **"Usar Toque"** desde la pantalla de inicio.

---

## Funcionalidades

- 🏅 **Récord personal** por modo, guardado en `localStorage`. Badge animado si bates tu mejor marca.
- 📤 **Compartir resultado** — Web Share API en móvil, fallback a portapapeles en PC.
- ⏳ **Countdown al 4 de mayo** — cuenta atrás en vivo en la pantalla de inicio; el día del evento muestra el banner de celebración.
- 🎵 **Música sintetizada** — Imperial March en Web Audio API (sin ficheros externos). Toggle independiente para música y efectos de sonido.
- 🌐 **Bilingüe** — Español / English, detección automática por idioma del navegador.
- ✨ **Hyperspace** — transición animada al empezar partida.
- 🏆 **Sistema de rangos** — título diferente según puntuación y bando (Gran Maestro Jedi, Señor Oscuro de los Sith, etc.).

---

## Ajustes

El panel de ajustes (⚙) permite:

| Ajuste | Opciones |
|--------|----------|
| Música | ON / OFF — Imperial March |
| Efectos | ON / OFF — SFX del sable y explosiones |
| Idioma | ES / EN |

Todos los ajustes se persisten en `localStorage`.

---

## Stack técnico

| Capa | Tecnología |
|------|------------|
| Bundler | Vite 5 |
| UI | React 18 |
| Estado | Zustand 4 |
| Renderizado | HTML5 Canvas (doble canvas: fondo + gameplay) |
| Audio | Web Audio API (síntesis, sin ficheros externos) |
| Estilos | CSS Modules + Google Fonts (Orbitron, Exo 2) |
| Despliegue | GitHub Pages (CI automático en push a `main`) |
| Node | ≥ 24 |

---

## Estructura del proyecto

```
src/
├── App.jsx                    # Enrutado entre pantallas + hyperspace overlay
├── main.jsx                   # Punto de entrada React + polyfill roundRect
├── game/
│   ├── engine.js              # Game loop supervivencia/infinito
│   ├── slashEngine.js         # Game loop modo sable
│   ├── entities.js            # Spawning de enemigos, balas y partículas
│   ├── entityShapes.js        # Hitboxes y formas de colisión
│   ├── renderer.js            # Funciones puras de renderizado canvas
│   ├── waves.js               # Configuración de oleadas y dificultad
│   ├── controls.js            # Giroscopio con 4 capas de fallback
│   ├── audioEngine.js         # Síntesis Web Audio API (SFX + Imperial March)
│   └── spriteLoader.js        # Carga de sprites SVG
├── store/
│   └── gameStore.js           # Zustand store + persistencia localStorage
├── screens/
│   ├── CrawlScreen            # Intro estilo Star Wars opening crawl
│   ├── IntroScreen            # Selector de bando, modo y controles
│   ├── GameScreen             # Canvas + HUD (supervivencia/infinito)
│   ├── SlashScreen            # Canvas + HUD (modo sable/maestro)
│   └── EndScreen              # Resultado, rango, récord y compartir
├── components/
│   ├── HUD                    # Vida, Force bar, score, combo, oleada
│   ├── WaveBanner             # Banner animado con localización SW entre oleadas
│   ├── ForceReady             # Indicador "FORCE READY" pulsante
│   ├── Joystick               # Joystick virtual táctil
│   └── SettingsPanel          # Panel música/SFX/idioma + versión
├── i18n/
│   └── index.js               # Traducciones ES / EN
└── styles/
    ├── variables.css           # Variables CSS (colores, fuentes)
    └── global.css              # Reset + animaciones globales (hyperspace)

public/
├── sprites/                   # SVG de enemigos y objetos
│   ├── droid.svg, trooper.svg, tie.svg, elite.svg, bomb.svg
├── manifest.json              # PWA manifest
└── favicon.svg
```

---

## Desarrollo local

```bash
# Requiere Node.js >= 24
npm install
npm run dev
```

Abre `http://localhost:5173/may4-game/` en el navegador.

Para probar en móvil desde la misma red:

```bash
npm run dev -- --host
```

Accede con la IP local desde el móvil para probar giroscopio y touch.

---

## Deploy

El proyecto se despliega automáticamente en **GitHub Pages** al hacer push a `main`.

```bash
npm run build   # genera dist/
```

El workflow `.github/workflows/deploy.yml` hace build y despliega en cada push.

---

*May the 4th be with you. 🌟*  
*Star Wars™ & © Lucasfilm Ltd. Fan game, no afiliado con Disney ni Lucasfilm.*
