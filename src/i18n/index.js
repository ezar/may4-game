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
        { type: 'p', text: 'El Imperio Galáctico extiende su sombra de hierro por todos los rincones de la galaxia. Sus legiones de droides B1, stormtroopers y cazas TIE avanzan sin descanso, aplastando toda resistencia en su camino.' },
        { type: 'p', text: 'Los últimos defensores de la República caen uno a uno. La esperanza parpadea como una estrella solitaria en el vacío del espacio profundo.' },
        { type: 'p', text: 'En el caos de la batalla, un guerrero solitario emerge de las sombras. Armado únicamente con su sable de luz y guiado por la Fuerza que corre por sus venas, acepta el desafío más difícil de su vida.' },
        { type: 'highlight', text: 'CINCO OLEADAS de tropas imperiales se lanzan en su contra.' },
        { type: 'p', text: 'De Geonosis a la Estrella de la Muerte, de Hoth a Bespin... la batalla se librará en los rincones más oscuros de la galaxia.' },
        { type: 'p', text: '¿Tienes suficiente Fuerza para sobrevivir?' },
      ],
    },
    intro: {
      chooseSide: 'ELIGE TU BANDO',
      jediTagline: 'Luz · Paz · Conocimiento',
      sithTagline: 'Poder · Pasión · Victoria',
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
        { emoji: '🤖', name: 'Droide B1',      detail: '1 HP · 10 pts',  note: '' },
        { emoji: '👾', name: 'Stormtrooper',   detail: '2 HP · 20 pts',  note: '' },
        { emoji: '🛸', name: 'Caza TIE',        detail: '1 HP · 15 pts',  note: 'Zigzag' },
        { emoji: '💀', name: 'Death Trooper',   detail: '3 HP · 40 pts',  note: 'Ola 3+' },
      ],
      slashObjects: [
        { emoji: '🤖', name: 'Droide B1',      detail: '10 pts',   note: '' },
        { emoji: '👾', name: 'Stormtrooper',   detail: '20 pts',   note: '' },
        { emoji: '🛸', name: 'Caza TIE',        detail: '15 pts',   note: '' },
        { emoji: '💀', name: 'Death Trooper',   detail: '40 pts',   note: 'Escaso' },
        { emoji: '💣', name: 'Detonador Térmico', detail: '−1 vida', note: '¡No cortar!' },
      ],
      waveRows: [
        ['OLA 1', 'GEONOSIS',             '6 kills',  'Droides y Stormtroopers'],
        ['OLA 2', 'KAMINO',               '10 kills', 'Mayor velocidad'],
        ['OLA 3', 'HOTH',                 '14 kills', 'Cazas TIE y Death Troopers'],
        ['OLA 4', 'BESPIN',               '18 kills', 'Disparos más rápidos'],
        ['OLA 5', 'ESTRELLA DE LA MUERTE','22 kills', 'Dificultad máxima'],
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
      forceReady: '¡FUERZA LISTA!',
      wave: (n) => `OLA ${n}`,
      hint: 'TOCA → DEFLECTAR · FORCE BLAST',
    },
    waves: {
      // [num_label, location, subtitle]
      messages: [
        ['OLA 1', 'GEONOSIS',              'El Despertar'],
        ['OLA 2', 'KAMINO',                'Tropas Imperiales'],
        ['OLA 3', 'HOTH',                  'Guardias Oscuros'],
        ['OLA 4', 'BESPIN',                'El Imperio Avanza'],
        ['OLA 5', 'ESTRELLA DE LA MUERTE', 'Batalla Final'],
      ],
    },
    end: {
      stars: '✦ ✦ ✦',
      victory: '¡VICTORIA!',
      gameOver: 'CAÍDO EN BATALLA',
      finalScore: 'PUNTUACIÓN FINAL',
      waveOf: (n) => `Oleada ${n} de 5`,
      slashMode: 'MODO SABLE',
      infiniteMode: 'MODO INFINITO',
      maestroMode: 'MAESTRO DEL SABLE',
      noCombo: 'Sin combo',
      retry: 'VOLVER A INTENTAR',
      ranks: {
        jedi:  ['GRAN MAESTRO JEDI', 'MAESTRO JEDI', 'CABALLERO JEDI', 'PADAWAN'],
        sith:  ['SEÑOR OSCURO DE LOS SITH', 'LORD SITH', 'APRENDIZ SITH', 'NOVATO SITH'],
        slash: ['MAESTRO DEL SABLE', 'ESPADACHÍN ÉLITE', 'APRENDIZ SABLE', 'RECLUTA'],
        lose:  'CAÍDO EN BATALLA',
      },
    },
    quotes: {
      winJedi: [
        '"Que la Fuerza te acompañe, siempre." — Obi-Wan Kenobi',
        '"Hazlo o no lo hagas. No existe el intentar." — Yoda',
        '"Tu determinación es tu única victoria real." — Qui-Gon Jinn',
        '"La Fuerza es fuerte en ti. Siempre lo fue." — Luke Skywalker',
        '"La paz es una mentira... pero tú la has encontrado." — Vieja Sabiduría Jedi',
      ],
      winSith: [
        '"A través del poder, gano la victoria." — Código Sith',
        '"La pasión me da fuerza. La fuerza me da poder." — Darth Revan',
        '"El lado oscuro siempre era más fuerte en ti." — Palpatine',
        '"¡Soy el Senado!" — Darth Sidious',
        '"Impresionante. Muy impresionante." — Darth Vader',
      ],
      lose: [
        '"¡Mala sensación tengo sobre esto!" — Han Solo',
        '"El lado oscuro… poderoso es. Ten cuidado, debes." — Yoda',
        '"Te encuentro... perturbador." — Darth Vader',
        '"No subestimes el poder del Lado Oscuro." — Palpatine',
        '"Impresionante. Muy impresionante." — Darth Vader',
        '"Esta no es la posición que yo elegiría." — C-3PO',
      ],
    },
    settings: {
      title: 'AJUSTES',
      music: 'Música',
      sfx: 'Efectos',
      language: 'Idioma',
      on: 'ON',
      off: 'OFF',
    },
    slashQuotes: [
      '"El sable de luz es el arma de un Jedi. No tan torpe como una pistola bláster." — Obi-Wan Kenobi',
      '"Corta primero, pregunta después." — Sabiduría Sith',
      '"El movimiento más rápido es el que no se ve venir." — Yoda',
      '"Soy el arma." — Mandalorian Proverb',
      '"La Fuerza guía mi hoja." — Anakin Skywalker',
      '"El arma de un Jedi no hace al Jedi. La Fuerza lo hace." — Mace Windu',
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
        { type: 'p', text: 'The Galactic Empire stretches its iron shadow across every corner of the galaxy. Its legions of B1 droids, stormtroopers and TIE fighters advance without rest, crushing all resistance in their path.' },
        { type: 'p', text: 'The last defenders of the Republic fall one by one. Hope flickers like a lone star in the void of deep space.' },
        { type: 'p', text: 'In the chaos of battle, a lone warrior emerges from the shadows. Armed only with a lightsaber and guided by the Force flowing through their veins, they accept the greatest challenge of their life.' },
        { type: 'highlight', text: 'FIVE WAVES of Imperial troops are unleashed against them.' },
        { type: 'p', text: 'From Geonosis to the Death Star, from Hoth to Bespin... the battle will rage across the darkest corners of the galaxy.' },
        { type: 'p', text: 'Do you have enough Force to survive?' },
      ],
    },
    intro: {
      chooseSide: 'CHOOSE YOUR SIDE',
      jediTagline: 'Light · Peace · Knowledge',
      sithTagline: 'Power · Passion · Victory',
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
        { emoji: '🤖', name: 'B1 Droid',       detail: '1 HP · 10 pts',  note: '' },
        { emoji: '👾', name: 'Stormtrooper',   detail: '2 HP · 20 pts',  note: '' },
        { emoji: '🛸', name: 'TIE Fighter',    detail: '1 HP · 15 pts',  note: 'Zigzag' },
        { emoji: '💀', name: 'Death Trooper',  detail: '3 HP · 40 pts',  note: 'Wave 3+' },
      ],
      slashObjects: [
        { emoji: '🤖', name: 'B1 Droid',       detail: '10 pts',   note: '' },
        { emoji: '👾', name: 'Stormtrooper',   detail: '20 pts',   note: '' },
        { emoji: '🛸', name: 'TIE Fighter',    detail: '15 pts',   note: '' },
        { emoji: '💀', name: 'Death Trooper',  detail: '40 pts',   note: 'Rare' },
        { emoji: '💣', name: 'Thermal Detonator', detail: '−1 life', note: "Don't slash!" },
      ],
      waveRows: [
        ['WAVE 1', 'GEONOSIS',            '6 kills',  'Droids and Stormtroopers'],
        ['WAVE 2', 'KAMINO',              '10 kills', 'Increased speed'],
        ['WAVE 3', 'HOTH',                '14 kills', 'TIE Fighters and Death Troopers'],
        ['WAVE 4', 'BESPIN',              '18 kills', 'Faster shots'],
        ['WAVE 5', 'DEATH STAR',          '22 kills', 'Maximum difficulty'],
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
      health: 'HULL',
      force: 'FORCE',
      forceReady: 'FORCE READY!',
      wave: (n) => `WAVE ${n}`,
      hint: 'TAP → DEFLECT · FORCE BLAST',
    },
    waves: {
      // [num_label, location, subtitle]
      messages: [
        ['WAVE 1', 'GEONOSIS',   'The Awakening'],
        ['WAVE 2', 'KAMINO',     'Imperial Troops'],
        ['WAVE 3', 'HOTH',       'Dark Guards'],
        ['WAVE 4', 'BESPIN',     'The Empire Strikes'],
        ['WAVE 5', 'DEATH STAR', 'Final Battle'],
      ],
    },
    end: {
      stars: '✦ ✦ ✦',
      victory: 'VICTORY!',
      gameOver: 'FALLEN IN BATTLE',
      finalScore: 'FINAL SCORE',
      waveOf: (n) => `Wave ${n} of 5`,
      slashMode: 'SABER MODE',
      infiniteMode: 'INFINITE MODE',
      maestroMode: 'SABER MASTER',
      noCombo: 'No combo',
      retry: 'TRY AGAIN',
      ranks: {
        jedi:  ['GRAND MASTER JEDI', 'JEDI MASTER', 'JEDI KNIGHT', 'PADAWAN'],
        sith:  ['DARK LORD OF THE SITH', 'SITH LORD', 'SITH APPRENTICE', 'SITH RECRUIT'],
        slash: ['SABER MASTER', 'ELITE DUELIST', 'SABER APPRENTICE', 'RECRUIT'],
        lose:  'FALLEN IN BATTLE',
      },
    },
    quotes: {
      winJedi: [
        '"May the Force be with you, always." — Obi-Wan Kenobi',
        '"Do or do not. There is no try." — Yoda',
        '"Your focus determines your reality." — Qui-Gon Jinn',
        '"The Force is strong with you. It always was." — Luke Skywalker',
        '"In my experience, there is no such thing as luck." — Obi-Wan Kenobi',
      ],
      winSith: [
        '"Through power, I gain victory." — Sith Code',
        '"I am the Senate!" — Darth Sidious',
        '"Impressive. Most impressive." — Darth Vader',
        '"The dark side of the Force is a pathway to many abilities." — Palpatine',
        '"Your passion gave you strength. Now, your strength serves the Empire." — Darth Vader',
      ],
      lose: [
        '"I have a bad feeling about this!" — Han Solo',
        '"The dark side… powerful it is. Careful, you must be." — Yoda',
        '"I find your lack of faith disturbing." — Darth Vader',
        '"Do not underestimate the power of the Dark Side." — Palpatine',
        '"Impressive. Most impressive." — Darth Vader',
        '"We\'re doomed!" — C-3PO',
      ],
    },
    settings: {
      title: 'SETTINGS',
      music: 'Music',
      sfx: 'Effects',
      language: 'Language',
      on: 'ON',
      off: 'OFF',
    },
    slashQuotes: [
      '"The lightsaber is a Jedi\'s weapon. Not as clumsy as a blaster." — Obi-Wan Kenobi',
      '"Slash first, ask questions later." — Sith Wisdom',
      '"The fastest move is the one you never see coming." — Yoda',
      '"This is the Way." — The Mandalorian',
      '"The Force guides my blade." — Anakin Skywalker',
      '"A Jedi\'s weapon earns them respect. The Force earns them wisdom." — Mace Windu',
    ],
  },
}

export function useT() {
  const lang = useGameStore(st => st.lang)
  return T[lang] ?? T.es
}
