import useGameStore from '../store/gameStore.js'

export const T = {
  es: {
    general: {
      starWarsDay: '— STAR WARS DAY —',
      mayThe4th: 'MAY THE 4TH',
      beWithYou: 'BE WITH YOU',
      skip: 'Saltar ›',
      detecting: 'Detectando…',
    },
    crawl: {
      longAgo: 'Hace mucho tiempo, en una galaxia\nmuy, muy lejana...',
      skip: 'Saltar ›',
      blocks: [
        { type: 'title', ep: 'EPISODIO I', name: 'UNA NUEVA AMENAZA' },
        { type: 'p', text: 'El Imperio Galáctico extiende su dominio de oscuridad por todos los rincones de la galaxia. Sus legiones de droides, stormtroopers y cazas TIE avanzan sin descanso, aplastando toda resistencia en su camino.' },
        { type: 'p', text: 'Los últimos defensores de la República caen uno a uno. La esperanza parpadea como una vela en el vacío del espacio.' },
        { type: 'p', text: 'En el caos de la batalla, un guerrero solitario emerge de las sombras. Armado únicamente con su sable de luz y guiado por la Fuerza que corre por sus venas, acepta el desafío más difícil de su vida.' },
        { type: 'highlight', text: 'CINCO OLEADAS de tropas imperiales se lanzan en su contra.' },
        { type: 'p', text: 'Jedi o Sith, el destino de la galaxia depende de un solo guerrero. El tiempo se agota.' },
        { type: 'p', text: '¿Tienes suficiente Fuerza para sobrevivir?' },
      ],
    },
    intro: {
      chooseSide: 'ELIGE TU BANDO',
      jediTagline: 'Luz y paz',
      sithTagline: 'Poder absoluto',
      gameMode: 'MODO DE JUEGO',
      survival: 'SUPERVIVENCIA',
      survivalDesc: '5 oleadas · Giroscopio',
      slash: 'MODO SABLE',
      slashDesc: 'Corta todo · Sin límite',
      infinite: 'MODO INFINITO',
      infiniteDesc: 'Sin límite · Oleadas ∞',
      maestro: 'MAESTRO DEL SABLE',
      maestroDesc: '60s · Máx puntuación',
      tabPlay: 'Cómo jugar',
      tabEnemies: 'Enemigos',
      tabObjects: 'Objetos',
      tabWaves: 'Oleadas',
      howTo: [
        { icon: '📱', title: 'Inclina', desc: 'Mueve tu personaje inclinando el móvil en cualquier dirección.' },
        { icon: '👆', title: 'Deflecta', desc: 'Toca cerca de un disparo para redirigirlo contra el enemigo.' },
        { icon: '⚡', title: 'Force Blast', desc: 'Cada kill carga tu Fuerza. Al 100%, toca para devastar la pantalla.' },
        { icon: '💥', title: 'Combo', desc: 'Kills rápidos consecutivos multiplican tu puntuación.' },
      ],
      howToSlash: [
        { icon: '🖐️', title: 'Desliza', desc: 'Arrastra el dedo rápido sobre los objetos para cortarlos con tu sable.' },
        { icon: '💣', title: 'Cuidado', desc: 'Las bombas te quitan una vida. ¡Nunca las cortes!' },
        { icon: '✨', title: 'Combo', desc: 'Cortes rápidos consecutivos multiplican tu puntuación.' },
        { icon: '❤️', title: 'Vidas', desc: 'Tienes 3 vidas. Cortar una bomba o dejar escapar un objeto las consume.' },
      ],
      howToMaestro: [
        { icon: '🖐️', title: 'Desliza', desc: 'Arrastra el dedo rápido sobre los objetos para cortarlos con tu sable.' },
        { icon: '⏱️', title: '60 Segundos', desc: 'Tienes 60 segundos para acumular la mayor puntuación posible.' },
        { icon: '✨', title: 'Combo', desc: 'Cortes rápidos consecutivos multiplican tu puntuación agresivamente.' },
        { icon: '💣', title: 'Bombas', desc: 'Cortar una bomba te cuesta 5 segundos del temporizador.' },
      ],
      enemies: [
        { emoji: '🤖', name: 'Droide',        detail: '1 HP · 10 pts',  note: '' },
        { emoji: '👾', name: 'Stormtrooper',  detail: '2 HP · 20 pts',  note: '' },
        { emoji: '🛸', name: 'TIE Fighter',   detail: '1 HP · 15 pts',  note: 'Zigzag' },
        { emoji: '💀', name: 'Guardia Élite', detail: '3 HP · 40 pts',  note: 'Ola 3+' },
      ],
      slashObjects: [
        { emoji: '🤖', name: 'Droide',        detail: '10 pts',   note: '' },
        { emoji: '👾', name: 'Stormtrooper',  detail: '20 pts',   note: '' },
        { emoji: '🛸', name: 'TIE Fighter',   detail: '15 pts',   note: '' },
        { emoji: '💀', name: 'Guardia Élite', detail: '40 pts',   note: 'Escaso' },
        { emoji: '💣', name: 'Bomba',         detail: '−1 vida',  note: '¡No cortar!' },
      ],
      waveRows: [
        ['OLA 1', 'La Fuerza Despierta',  '6 kills',  'Droides y Stormtroopers'],
        ['OLA 2', 'Tropas Imperiales',     '10 kills', 'Mayor velocidad'],
        ['OLA 3', 'Guardias Oscuros',      '14 kills', 'TIE Fighters y Élites aparecen'],
        ['OLA 4', 'El Imperio Avanza',     '18 kills', 'Disparos más rápidos'],
        ['OLA 5', 'Batalla Final',         '22 kills', 'Dificultad máxima'],
      ],
      waveTip: '+20 HP al completar cada ola',
      ctrlLabels: {
        0: { text: 'Sin activar', cls: '' },
        1: { text: '✓ Giroscopio activo', cls: 'ok' },
        2: { text: '✓ Orientación activa', cls: 'ok' },
        3: { text: '🕹 Joystick virtual', cls: 'ok' },
      },
      activateGyro: '📡 Activar Giroscopio',
      hintSide: 'Elige tu bando para continuar',
      hintMode: 'Elige un modo de juego para continuar',
      hintGyro: 'Activa el giroscopio para continuar',
      startLabel: (mode, side) => {
        const sideStr = side === 'jedi' ? 'JEDI' : 'SITH'
        if (mode === 'survival') return `SUPERVIVENCIA · ${sideStr}`
        if (mode === 'slash') return `MODO SABLE · ${sideStr}`
        if (mode === 'infinite') return `MODO INFINITO · ${sideStr}`
        if (mode === 'maestro') return `MAESTRO DEL SABLE · ${sideStr}`
        return 'COMENZAR'
      },
      startDefault: 'COMENZAR',
    },
    hud: {
      health: 'VIDA',
      force: 'FUERZA',
      wave: (n) => `OLA ${n}`,
      hint: 'TAP → DEFLECTAR · FORCE BLAST',
    },
    waves: {
      messages: [
        ['OLA 1', 'LA FUERZA DESPIERTA'],
        ['OLA 2', 'TROPAS IMPERIALES'],
        ['OLA 3', 'GUARDIAS OSCUROS'],
        ['OLA 4', 'EL IMPERIO AVANZA'],
        ['OLA 5', 'BATALLA FINAL'],
      ],
    },
    end: {
      stars: '✦ ✦ ✦',
      victory: '¡VICTORIA!',
      gameOver: 'GAME OVER',
      finalScore: 'PUNTUACIÓN FINAL',
      waveOf: (n) => `OLA ${n} de 5`,
      slashMode: 'MODO SABLE',
      infiniteMode: 'MODO INFINITO',
      maestroMode: 'MAESTRO DEL SABLE',
      noCombo: 'Sin combo',
      retry: 'VOLVER A INTENTAR',
    },
    quotes: {
      winJedi: [
        '«Que la Fuerza te acompañe.»',
        '«Hazlo o no lo hagas. No existe el intentar.» — Yoda',
        '«La paz llega a quienes merecen la Fuerza.»',
      ],
      winSith: [
        '«A través del poder, gano la victoria.»',
        '«La pasión me da fuerza.»',
        '«El lado oscuro siempre fue más fuerte en ti.»',
      ],
      lose: [
        '«¡Mala sensación tengo!» — Han Solo',
        '«El lado oscuro… poderoso es.» — Yoda',
        '«No subestimes al Imperio.»',
        '«La galaxia necesita un héroe.»',
      ],
    },
    slashQuotes: [
      '"El sable de luz es la vida del Jedi." — Obi-Wan Kenobi',
      '"Corta primero, pregunta después." — Sabiduría Sith',
      '"El movimiento más rápido es el que no se ve venir." — Yoda',
      '"Un guerrero sin espada no es guerrero." — Proverbio Mandaloriano',
      '"La Fuerza guía mi hoja." — Anakin Skywalker',
    ],
  },

  en: {
    general: {
      starWarsDay: '— STAR WARS DAY —',
      mayThe4th: 'MAY THE 4TH',
      beWithYou: 'BE WITH YOU',
      skip: 'Skip ›',
      detecting: 'Detecting…',
    },
    crawl: {
      longAgo: 'A long time ago, in a galaxy\nfar, far away...',
      skip: 'Skip ›',
      blocks: [
        { type: 'title', ep: 'EPISODE I', name: 'A NEW THREAT' },
        { type: 'p', text: 'The Galactic Empire extends its dark dominion across every corner of the galaxy. Its legions of droids, stormtroopers and TIE fighters advance without rest, crushing all resistance in their path.' },
        { type: 'p', text: 'The last defenders of the Republic fall one by one. Hope flickers like a candle in the void of space.' },
        { type: 'p', text: 'In the chaos of battle, a lone warrior emerges from the shadows. Armed only with a lightsaber and guided by the Force flowing through their veins, they accept the greatest challenge of their life.' },
        { type: 'highlight', text: 'FIVE WAVES of Imperial troops are unleashed against them.' },
        { type: 'p', text: 'Jedi or Sith, the fate of the galaxy rests on a single warrior. Time is running out.' },
        { type: 'p', text: 'Do you have enough Force to survive?' },
      ],
    },
    intro: {
      chooseSide: 'CHOOSE YOUR SIDE',
      jediTagline: 'Light and peace',
      sithTagline: 'Absolute power',
      gameMode: 'GAME MODE',
      survival: 'SURVIVAL',
      survivalDesc: '5 waves · Gyroscope',
      slash: 'SABER MODE',
      slashDesc: 'Slash all · Endless',
      infinite: 'INFINITE MODE',
      infiniteDesc: 'No limit · Waves ∞',
      maestro: 'SABER MASTER',
      maestroDesc: '60s · Max score',
      tabPlay: 'How to play',
      tabEnemies: 'Enemies',
      tabObjects: 'Objects',
      tabWaves: 'Waves',
      howTo: [
        { icon: '📱', title: 'Tilt', desc: 'Move your character by tilting your phone in any direction.' },
        { icon: '👆', title: 'Deflect', desc: 'Tap near a shot to redirect it back at the enemy.' },
        { icon: '⚡', title: 'Force Blast', desc: 'Each kill charges your Force. At 100%, tap to devastate the screen.' },
        { icon: '💥', title: 'Combo', desc: 'Rapid consecutive kills multiply your score.' },
      ],
      howToSlash: [
        { icon: '🖐️', title: 'Swipe', desc: 'Drag your finger fast across objects to slash them with your saber.' },
        { icon: '💣', title: 'Watch out', desc: 'Bombs cost you a life. Never slash them!' },
        { icon: '✨', title: 'Combo', desc: 'Rapid consecutive slashes multiply your score.' },
        { icon: '❤️', title: 'Lives', desc: 'You have 3 lives. Slashing a bomb or missing an object costs one.' },
      ],
      howToMaestro: [
        { icon: '🖐️', title: 'Swipe', desc: 'Drag your finger fast across objects to slash them with your saber.' },
        { icon: '⏱️', title: '60 Seconds', desc: 'You have 60 seconds to rack up the highest score possible.' },
        { icon: '✨', title: 'Combo', desc: 'Rapid consecutive slashes multiply your score aggressively.' },
        { icon: '💣', title: 'Bombs', desc: 'Slashing a bomb costs you 5 seconds from the timer.' },
      ],
      enemies: [
        { emoji: '🤖', name: 'Droid',         detail: '1 HP · 10 pts',  note: '' },
        { emoji: '👾', name: 'Stormtrooper',  detail: '2 HP · 20 pts',  note: '' },
        { emoji: '🛸', name: 'TIE Fighter',   detail: '1 HP · 15 pts',  note: 'Zigzag' },
        { emoji: '💀', name: 'Elite Guard',   detail: '3 HP · 40 pts',  note: 'Wave 3+' },
      ],
      slashObjects: [
        { emoji: '🤖', name: 'Droid',         detail: '10 pts',   note: '' },
        { emoji: '👾', name: 'Stormtrooper',  detail: '20 pts',   note: '' },
        { emoji: '🛸', name: 'TIE Fighter',   detail: '15 pts',   note: '' },
        { emoji: '💀', name: 'Elite Guard',   detail: '40 pts',   note: 'Rare' },
        { emoji: '💣', name: 'Bomb',          detail: '−1 life',  note: "Don't slash!" },
      ],
      waveRows: [
        ['WAVE 1', 'The Force Awakens',   '6 kills',  'Droids and Stormtroopers'],
        ['WAVE 2', 'Imperial Troops',     '10 kills', 'Increased speed'],
        ['WAVE 3', 'Dark Guards',         '14 kills', 'TIE Fighters and Elites appear'],
        ['WAVE 4', 'The Empire Strikes',  '18 kills', 'Faster shots'],
        ['WAVE 5', 'Final Battle',        '22 kills', 'Maximum difficulty'],
      ],
      waveTip: '+20 HP on completing each wave',
      ctrlLabels: {
        0: { text: 'Not activated', cls: '' },
        1: { text: '✓ Gyroscope active', cls: 'ok' },
        2: { text: '✓ Orientation active', cls: 'ok' },
        3: { text: '🕹 Virtual joystick', cls: 'ok' },
      },
      activateGyro: '📡 Activate Gyroscope',
      hintSide: 'Choose your side to continue',
      hintMode: 'Choose a game mode to continue',
      hintGyro: 'Activate the gyroscope to continue',
      startLabel: (mode, side) => {
        const sideStr = side === 'jedi' ? 'JEDI' : 'SITH'
        if (mode === 'survival') return `SURVIVAL · ${sideStr}`
        if (mode === 'slash') return `SABER MODE · ${sideStr}`
        if (mode === 'infinite') return `INFINITE MODE · ${sideStr}`
        if (mode === 'maestro') return `SABER MASTER · ${sideStr}`
        return 'START'
      },
      startDefault: 'START',
    },
    hud: {
      health: 'HEALTH',
      force: 'FORCE',
      wave: (n) => `WAVE ${n}`,
      hint: 'TAP → DEFLECT · FORCE BLAST',
    },
    waves: {
      messages: [
        ['WAVE 1', 'THE FORCE AWAKENS'],
        ['WAVE 2', 'IMPERIAL TROOPS'],
        ['WAVE 3', 'DARK GUARDS'],
        ['WAVE 4', 'THE EMPIRE STRIKES'],
        ['WAVE 5', 'FINAL BATTLE'],
      ],
    },
    end: {
      stars: '✦ ✦ ✦',
      victory: 'VICTORY!',
      gameOver: 'GAME OVER',
      finalScore: 'FINAL SCORE',
      waveOf: (n) => `WAVE ${n} of 5`,
      slashMode: 'SABER MODE',
      infiniteMode: 'INFINITE MODE',
      maestroMode: 'SABER MASTER',
      noCombo: 'No combo',
      retry: 'TRY AGAIN',
    },
    quotes: {
      winJedi: [
        '"May the Force be with you."',
        '"Do or do not. There is no try." — Yoda',
        '"Peace comes to those who deserve the Force."',
      ],
      winSith: [
        '"Through power, I gain victory."',
        '"My passion gives me strength."',
        '"The dark side was always stronger in you."',
      ],
      lose: [
        '"I have a bad feeling about this!" — Han Solo',
        '"The dark side… powerful it is." — Yoda',
        '"Never underestimate the Empire."',
        '"The galaxy needs a hero."',
      ],
    },
    slashQuotes: [
      '"The lightsaber is the life of the Jedi." — Obi-Wan Kenobi',
      '"Slash first, ask questions later." — Sith Wisdom',
      '"The fastest move is the one you never see coming." — Yoda',
      '"A warrior without a blade is no warrior." — Mandalorian Proverb',
      '"The Force guides my blade." — Anakin Skywalker',
    ],
  },
}

export function useT() {
  const lang = useGameStore(st => st.lang)
  return T[lang] ?? T.es
}
