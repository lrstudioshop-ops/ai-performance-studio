// Mock data for Larios Fitness App

export interface Athlete {
  id: string;
  name: string;
  avatar: string;
  sport: string;
  level: 'bajo' | 'intermedio' | 'elite' | 'profesional';
  weight: number;
  height: number;
  vo2max: number;
  fatigueLevel: number;
  injuryRisk: number;
  goals: string[];
  joinDate: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'fuerza' | 'resistencia' | 'velocidad' | 'potencia' | 'movilidad' | 'recuperacion';
  muscleGroups: string[];
  difficulty: 'facil' | 'medio' | 'dificil';
  equipment: string[];
  instructions: string[];
  duration: number;
  calories: number;
  imageUrl?: string;
}

export interface TrainingSession {
  id: string;
  name: string;
  date: string;
  duration: number;
  type: string;
  exercises: { exerciseId: string; sets: number; reps: number; weight?: number }[];
  completed: boolean;
  intensity: number;
  caloriesBurned: number;
}

export interface PerformanceMetric {
  date: string;
  vo2max: number;
  strength: number;
  endurance: number;
  speed: number;
  power: number;
  recovery: number;
}

export interface WeeklyStats {
  week: string;
  sessions: number;
  duration: number;
  calories: number;
  avgIntensity: number;
}

// Default athlete data (will be overridden by user context)
export const currentAthlete: Athlete = {
  id: '1',
  name: 'Usuario',
  avatar: '',
  sport: 'Fitness',
  level: 'intermedio',
  weight: 75,
  height: 175,
  vo2max: 45,
  fatigueLevel: 30,
  injuryRisk: 10,
  goals: ['Ganar masa muscular', 'Mejorar resistencia', 'Perder grasa'],
  joinDate: '2024-01-15',
};

// Exercise library by sport
export const exercisesBySport: Record<string, Exercise[]> = {
  crossfit: [
    {
      id: 'cf1',
      name: 'Burpees',
      category: 'potencia',
      muscleGroups: ['Cuerpo completo'],
      difficulty: 'dificil',
      equipment: [],
      instructions: [
        'Posición de pie',
        'Agáchate y coloca las manos en el suelo',
        'Salta hacia atrás a posición de plancha',
        'Realiza una flexión',
        'Salta hacia adelante',
        'Salta con los brazos arriba',
      ],
      duration: 30,
      calories: 15,
    },
    {
      id: 'cf2',
      name: 'Box Jumps',
      category: 'potencia',
      muscleGroups: ['Cuádriceps', 'Glúteos', 'Gemelos'],
      difficulty: 'medio',
      equipment: ['Cajón pliométrico'],
      instructions: [
        'Párate frente al cajón',
        'Flexiona ligeramente las rodillas',
        'Salta explosivamente hacia el cajón',
        'Aterriza suavemente',
        'Baja con control',
      ],
      duration: 25,
      calories: 12,
    },
    {
      id: 'cf3',
      name: 'Wall Balls',
      category: 'resistencia',
      muscleGroups: ['Piernas', 'Hombros', 'Core'],
      difficulty: 'medio',
      equipment: ['Balón medicinal', 'Pared'],
      instructions: [
        'Sostén el balón frente al pecho',
        'Realiza una sentadilla profunda',
        'Al subir, lanza el balón a la pared',
        'Atrapa el balón y repite',
      ],
      duration: 60,
      calories: 18,
    },
  ],
  fitness: [
    {
      id: 'fit1',
      name: 'Press de Banca',
      category: 'fuerza',
      muscleGroups: ['Pectorales', 'Tríceps', 'Deltoides'],
      difficulty: 'medio',
      equipment: ['Barra', 'Banco', 'Rack'],
      instructions: [
        'Acuéstate en el banco con los pies en el suelo',
        'Agarra la barra con las manos más anchas que los hombros',
        'Baja la barra controladamente al pecho',
        'Empuja hacia arriba hasta extender los brazos',
      ],
      duration: 45,
      calories: 10,
    },
    {
      id: 'fit2',
      name: 'Sentadilla con Barra',
      category: 'fuerza',
      muscleGroups: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
      difficulty: 'medio',
      equipment: ['Barra', 'Rack'],
      instructions: [
        'Coloca la barra en la parte superior de la espalda',
        'Pies a la anchura de los hombros',
        'Baja hasta que los muslos estén paralelos al suelo',
        'Sube empujando con los talones',
      ],
      duration: 45,
      calories: 12,
    },
    {
      id: 'fit3',
      name: 'Peso Muerto',
      category: 'fuerza',
      muscleGroups: ['Espalda', 'Glúteos', 'Isquiotibiales'],
      difficulty: 'dificil',
      equipment: ['Barra', 'Discos'],
      instructions: [
        'Pies a la anchura de las caderas',
        'Agarra la barra con las manos fuera de las piernas',
        'Mantén la espalda recta',
        'Levanta empujando con las piernas y caderas',
        'Baja controladamente',
      ],
      duration: 50,
      calories: 15,
    },
  ],
  running: [
    {
      id: 'run1',
      name: 'Intervalos de Velocidad',
      category: 'velocidad',
      muscleGroups: ['Piernas', 'Core'],
      difficulty: 'dificil',
      equipment: ['Pista o cinta'],
      instructions: [
        'Calienta 5 minutos trotando',
        'Sprint al 90% durante 30 segundos',
        'Recuperación activa 1 minuto',
        'Repite 8-10 veces',
        'Enfriamiento 5 minutos',
      ],
      duration: 300,
      calories: 80,
    },
    {
      id: 'run2',
      name: 'Carrera Continua',
      category: 'resistencia',
      muscleGroups: ['Piernas', 'Corazón'],
      difficulty: 'facil',
      equipment: [],
      instructions: [
        'Mantén un ritmo constante',
        'Respira de forma regular',
        'Cadencia de 170-180 pasos por minuto',
        'Tiempo objetivo: 30-60 minutos',
      ],
      duration: 1800,
      calories: 300,
    },
  ],
  natacion: [
    {
      id: 'nat1',
      name: 'Crol Técnico',
      category: 'resistencia',
      muscleGroups: ['Espalda', 'Hombros', 'Core'],
      difficulty: 'medio',
      equipment: ['Piscina', 'Gafas'],
      instructions: [
        'Posición horizontal del cuerpo',
        'Rotación del cuerpo con cada brazada',
        'Patada desde la cadera',
        'Respiración bilateral',
      ],
      duration: 600,
      calories: 100,
    },
    {
      id: 'nat2',
      name: 'Series de 100m',
      category: 'velocidad',
      muscleGroups: ['Cuerpo completo'],
      difficulty: 'dificil',
      equipment: ['Piscina'],
      instructions: [
        'Nada 100m al máximo esfuerzo',
        'Descanso 30-60 segundos',
        'Repite 8-10 veces',
        'Mantén buena técnica',
      ],
      duration: 900,
      calories: 150,
    },
  ],
  yoga: [
    {
      id: 'yog1',
      name: 'Saludo al Sol',
      category: 'movilidad',
      muscleGroups: ['Cuerpo completo'],
      difficulty: 'facil',
      equipment: ['Esterilla'],
      instructions: [
        'Posición de montaña',
        'Inhala y levanta los brazos',
        'Exhala e inclínate hacia adelante',
        'Continúa con el flujo completo',
      ],
      duration: 180,
      calories: 20,
    },
    {
      id: 'yog2',
      name: 'Guerrero I, II, III',
      category: 'fuerza',
      muscleGroups: ['Piernas', 'Core', 'Hombros'],
      difficulty: 'medio',
      equipment: ['Esterilla'],
      instructions: [
        'Comienza en posición de montaña',
        'Da un paso largo hacia atrás',
        'Mantén cada posición 5 respiraciones',
        'Repite en el otro lado',
      ],
      duration: 300,
      calories: 25,
    },
  ],
  ciclismo: [
    {
      id: 'cic1',
      name: 'Intervalos en Bicicleta',
      category: 'velocidad',
      muscleGroups: ['Cuádriceps', 'Glúteos', 'Corazón'],
      difficulty: 'dificil',
      equipment: ['Bicicleta'],
      instructions: [
        'Calienta 10 minutos a ritmo suave',
        'Sprint de 1 minuto al 95%',
        'Recuperación 2 minutos',
        'Repite 6-8 veces',
      ],
      duration: 1800,
      calories: 250,
    },
    {
      id: 'cic2',
      name: 'Rodaje de Fondo',
      category: 'resistencia',
      muscleGroups: ['Piernas', 'Corazón'],
      difficulty: 'facil',
      equipment: ['Bicicleta'],
      instructions: [
        'Mantén cadencia de 80-90 rpm',
        'Ritmo conversacional',
        'Duración: 60-120 minutos',
        'Hidratación constante',
      ],
      duration: 3600,
      calories: 400,
    },
  ],
};

// Generic exercises for all sports (expanded library)
export const exercises: Exercise[] = [
  ...exercisesBySport.fitness,
  ...exercisesBySport.crossfit,
  // Fuerza
  {
    id: 'gen1',
    name: 'Plancha',
    category: 'fuerza',
    muscleGroups: ['Core', 'Hombros'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Apoya los antebrazos y las puntas de los pies',
      'Mantén el cuerpo recto como una tabla',
      'Activa el core durante todo el ejercicio',
      'Mantén 30-60 segundos',
    ],
    duration: 60,
    calories: 5,
  },
  {
    id: 'gen2',
    name: 'Dominadas',
    category: 'fuerza',
    muscleGroups: ['Dorsales', 'Bíceps', 'Core'],
    difficulty: 'dificil',
    equipment: ['Barra de dominadas'],
    instructions: [
      'Agarra la barra con las palmas hacia adelante',
      'Cuelga con los brazos extendidos',
      'Tira hacia arriba hasta que la barbilla supere la barra',
      'Baja controladamente',
    ],
    duration: 30,
    calories: 10,
  },
  {
    id: 'gen3',
    name: 'Zancadas',
    category: 'fuerza',
    muscleGroups: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'De pie, da un paso largo hacia adelante',
      'Baja la rodilla trasera hacia el suelo',
      'Mantén el torso erguido',
      'Empuja con el pie delantero para volver',
    ],
    duration: 45,
    calories: 8,
  },
  
  // Resistencia
  {
    id: 'res1',
    name: 'Mountain Climbers',
    category: 'resistencia',
    muscleGroups: ['Core', 'Piernas', 'Hombros'],
    difficulty: 'medio',
    equipment: [],
    instructions: [
      'Posición de plancha alta con brazos extendidos',
      'Lleva una rodilla hacia el pecho',
      'Alterna rápidamente entre piernas',
      'Mantén el core activo y la espalda recta',
    ],
    duration: 45,
    calories: 12,
  },
  {
    id: 'res2',
    name: 'Jumping Jacks',
    category: 'resistencia',
    muscleGroups: ['Cuerpo completo', 'Cardiovascular'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'De pie con los pies juntos y brazos a los lados',
      'Salta separando las piernas y levantando los brazos',
      'Vuelve a la posición inicial con otro salto',
      'Mantén un ritmo constante',
    ],
    duration: 60,
    calories: 10,
  },
  {
    id: 'res3',
    name: 'Remo en Máquina',
    category: 'resistencia',
    muscleGroups: ['Espalda', 'Piernas', 'Core'],
    difficulty: 'medio',
    equipment: ['Máquina de remo'],
    instructions: [
      'Siéntate con los pies en los apoyos',
      'Agarra la barra con ambas manos',
      'Empuja con las piernas y tira con la espalda',
      'Vuelve controladamente a la posición inicial',
    ],
    duration: 300,
    calories: 50,
  },
  {
    id: 'res4',
    name: 'Saltar la Cuerda',
    category: 'resistencia',
    muscleGroups: ['Piernas', 'Hombros', 'Cardiovascular'],
    difficulty: 'medio',
    equipment: ['Cuerda de saltar'],
    instructions: [
      'Sostén la cuerda con los codos cerca del cuerpo',
      'Salta con ambos pies juntos',
      'Gira la cuerda con las muñecas, no con los brazos',
      'Mantén un ritmo constante durante el tiempo indicado',
    ],
    duration: 120,
    calories: 20,
  },
  
  // Velocidad
  {
    id: 'vel1',
    name: 'Sprints de 50m',
    category: 'velocidad',
    muscleGroups: ['Cuádriceps', 'Glúteos', 'Gemelos'],
    difficulty: 'dificil',
    equipment: [],
    instructions: [
      'Posición de salida con rodilla delantera flexionada',
      'Explosión máxima en los primeros metros',
      'Mantén el torso ligeramente inclinado',
      'Recupera 60-90 segundos entre sprints',
    ],
    duration: 10,
    calories: 15,
  },
  {
    id: 'vel2',
    name: 'Skipping Alto',
    category: 'velocidad',
    muscleGroups: ['Cuádriceps', 'Flexores de cadera'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Corre en el sitio elevando las rodillas al pecho',
      'Brazos en movimiento coordinado',
      'Mantén el core activo',
      'Aumenta la velocidad progresivamente',
    ],
    duration: 30,
    calories: 8,
  },
  {
    id: 'vel3',
    name: 'Escalera de Agilidad',
    category: 'velocidad',
    muscleGroups: ['Piernas', 'Coordinación', 'Core'],
    difficulty: 'medio',
    equipment: ['Escalera de agilidad'],
    instructions: [
      'Coloca los pies dentro de cada cuadro',
      'Mantén el centro de gravedad bajo',
      'Mueve los brazos coordinadamente',
      'Practica diferentes patrones de pisada',
    ],
    duration: 45,
    calories: 10,
  },
  {
    id: 'vel4',
    name: 'Saltos Laterales',
    category: 'velocidad',
    muscleGroups: ['Abductores', 'Aductores', 'Gemelos'],
    difficulty: 'medio',
    equipment: [],
    instructions: [
      'De pie, salta lateralmente a un lado',
      'Aterriza suavemente sobre un pie',
      'Inmediatamente salta al otro lado',
      'Mantén el equilibrio y la velocidad',
    ],
    duration: 30,
    calories: 8,
  },
  
  // Potencia
  {
    id: 'pot1',
    name: 'Clean & Jerk',
    category: 'potencia',
    muscleGroups: ['Cuerpo completo', 'Hombros', 'Piernas'],
    difficulty: 'dificil',
    equipment: ['Barra olímpica', 'Discos'],
    instructions: [
      'Posición inicial con la barra en el suelo',
      'Primer tirón hasta la cadera',
      'Segundo tirón llevando la barra a los hombros',
      'Jerk: empuja la barra por encima de la cabeza',
    ],
    duration: 20,
    calories: 15,
  },
  {
    id: 'pot2',
    name: 'Kettlebell Swing',
    category: 'potencia',
    muscleGroups: ['Glúteos', 'Isquiotibiales', 'Core'],
    difficulty: 'medio',
    equipment: ['Kettlebell'],
    instructions: [
      'Pies más anchos que los hombros',
      'Bisagra de cadera con la kettlebell entre las piernas',
      'Extiende cadera explosivamente',
      'La kettlebell sube hasta la altura del pecho',
    ],
    duration: 30,
    calories: 12,
  },
  {
    id: 'pot3',
    name: 'Medicine Ball Slam',
    category: 'potencia',
    muscleGroups: ['Core', 'Hombros', 'Espalda'],
    difficulty: 'medio',
    equipment: ['Balón medicinal'],
    instructions: [
      'Levanta el balón por encima de la cabeza',
      'Flexiona todo el cuerpo hacia abajo',
      'Lanza el balón al suelo con máxima fuerza',
      'Recoge el balón y repite',
    ],
    duration: 25,
    calories: 10,
  },
  {
    id: 'pot4',
    name: 'Push Press',
    category: 'potencia',
    muscleGroups: ['Hombros', 'Tríceps', 'Piernas'],
    difficulty: 'medio',
    equipment: ['Barra', 'Discos'],
    instructions: [
      'Barra apoyada en los hombros',
      'Pequeña flexión de rodillas',
      'Extensión explosiva de piernas',
      'Empuja la barra por encima de la cabeza',
    ],
    duration: 25,
    calories: 10,
  },
  
  // Movilidad
  {
    id: 'mov1',
    name: 'Estiramientos Dinámicos',
    category: 'movilidad',
    muscleGroups: ['Cuerpo completo'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Realiza movimientos controlados',
      'Aumenta gradualmente el rango de movimiento',
      'Incluye todas las articulaciones principales',
      'Mantén cada posición 2-3 segundos',
    ],
    duration: 300,
    calories: 15,
  },
  {
    id: 'mov2',
    name: 'Foam Rolling',
    category: 'movilidad',
    muscleGroups: ['Músculos tensos', 'Fascia'],
    difficulty: 'facil',
    equipment: ['Foam roller'],
    instructions: [
      'Coloca el músculo sobre el rodillo',
      'Rueda lentamente sobre el área tensa',
      'Pausa en los puntos de tensión',
      'Dedica 1-2 minutos por grupo muscular',
    ],
    duration: 600,
    calories: 10,
  },
  {
    id: 'mov3',
    name: 'Movilidad de Cadera',
    category: 'movilidad',
    muscleGroups: ['Cadera', 'Glúteos', 'Flexores'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Círculos de cadera en ambas direcciones',
      '90/90 stretch manteniendo 30 segundos',
      'Sentadilla profunda con movimiento lateral',
      'Estiramiento de flexores de cadera',
    ],
    duration: 300,
    calories: 10,
  },
  {
    id: 'mov4',
    name: 'Movilidad de Hombros',
    category: 'movilidad',
    muscleGroups: ['Hombros', 'Espalda alta', 'Pecho'],
    difficulty: 'facil',
    equipment: ['Banda elástica'],
    instructions: [
      'Pass-throughs con banda o palo',
      'Rotaciones internas y externas',
      'Estiramiento de pecho en puerta',
      'Círculos de hombros progresivos',
    ],
    duration: 240,
    calories: 8,
  },
  
  // Recuperación
  {
    id: 'rec1',
    name: 'Caminata Suave',
    category: 'recuperacion',
    muscleGroups: ['Piernas', 'Cardiovascular'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Camina a ritmo conversacional',
      'Mantén buena postura',
      'Respira profundamente',
      'Duración: 20-30 minutos',
    ],
    duration: 1200,
    calories: 60,
  },
  {
    id: 'rec2',
    name: 'Respiración Profunda',
    category: 'recuperacion',
    muscleGroups: ['Sistema nervioso', 'Diafragma'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Siéntate o acuéstate cómodamente',
      'Inhala 4 segundos por la nariz',
      'Mantén 4 segundos',
      'Exhala 6-8 segundos por la boca',
    ],
    duration: 300,
    calories: 5,
  },
  {
    id: 'rec3',
    name: 'Estiramientos Estáticos',
    category: 'recuperacion',
    muscleGroups: ['Cuerpo completo'],
    difficulty: 'facil',
    equipment: [],
    instructions: [
      'Mantén cada estiramiento 30-60 segundos',
      'No rebotes en la posición',
      'Respira profundamente',
      'Enfócate en los músculos trabajados',
    ],
    duration: 600,
    calories: 15,
  },
  {
    id: 'rec4',
    name: 'Yoga Restaurativo',
    category: 'recuperacion',
    muscleGroups: ['Cuerpo completo', 'Mente'],
    difficulty: 'facil',
    equipment: ['Esterilla', 'Bloques', 'Manta'],
    instructions: [
      'Posturas pasivas mantenidas 3-5 minutos',
      'Usa apoyos para mayor comodidad',
      'Enfócate en la respiración',
      'Relaja conscientemente cada músculo',
    ],
    duration: 900,
    calories: 20,
  },
];

// Performance metrics history
export const performanceHistory: PerformanceMetric[] = [
  { date: '2024-01-01', vo2max: 40, strength: 55, endurance: 50, speed: 45, power: 48, recovery: 65 },
  { date: '2024-02-01', vo2max: 42, strength: 58, endurance: 53, speed: 48, power: 51, recovery: 67 },
  { date: '2024-03-01', vo2max: 43, strength: 62, endurance: 56, speed: 52, power: 55, recovery: 64 },
  { date: '2024-04-01', vo2max: 44, strength: 65, endurance: 60, speed: 55, power: 58, recovery: 70 },
  { date: '2024-05-01', vo2max: 45, strength: 68, endurance: 63, speed: 58, power: 62, recovery: 68 },
  { date: '2024-06-01', vo2max: 47, strength: 70, endurance: 66, speed: 60, power: 65, recovery: 72 },
  { date: '2024-07-01', vo2max: 48, strength: 73, endurance: 70, speed: 63, power: 68, recovery: 75 },
];

// Weekly statistics
export const weeklyStats: WeeklyStats[] = [
  { week: 'Sem 1', sessions: 3, duration: 180, calories: 900, avgIntensity: 65 },
  { week: 'Sem 2', sessions: 4, duration: 240, calories: 1200, avgIntensity: 70 },
  { week: 'Sem 3', sessions: 3, duration: 210, calories: 1050, avgIntensity: 72 },
  { week: 'Sem 4', sessions: 5, duration: 300, calories: 1500, avgIntensity: 75 },
  { week: 'Sem 5', sessions: 4, duration: 260, calories: 1300, avgIntensity: 73 },
  { week: 'Sem 6', sessions: 4, duration: 280, calories: 1400, avgIntensity: 78 },
];

// Training schedule
export const trainingSchedule: TrainingSession[] = [
  {
    id: 'ts1',
    name: 'Fuerza - Tren Inferior',
    date: '2024-07-08',
    duration: 60,
    type: 'fuerza',
    exercises: [
      { exerciseId: 'fit2', sets: 4, reps: 8, weight: 80 },
      { exerciseId: 'fit3', sets: 4, reps: 6, weight: 100 },
      { exerciseId: 'gen3', sets: 3, reps: 12 },
    ],
    completed: true,
    intensity: 80,
    caloriesBurned: 350,
  },
  {
    id: 'ts2',
    name: 'Cardio HIIT',
    date: '2024-07-09',
    duration: 45,
    type: 'resistencia',
    exercises: [
      { exerciseId: 'cf1', sets: 4, reps: 15 },
      { exerciseId: 'cf2', sets: 4, reps: 10 },
    ],
    completed: true,
    intensity: 85,
    caloriesBurned: 400,
  },
  {
    id: 'ts3',
    name: 'Fuerza - Tren Superior',
    date: '2024-07-10',
    duration: 60,
    type: 'fuerza',
    exercises: [
      { exerciseId: 'fit1', sets: 4, reps: 8, weight: 70 },
      { exerciseId: 'gen2', sets: 4, reps: 8 },
      { exerciseId: 'gen1', sets: 3, reps: 60 },
    ],
    completed: false,
    intensity: 75,
    caloriesBurned: 0,
  },
  {
    id: 'ts4',
    name: 'Recuperación Activa',
    date: '2024-07-11',
    duration: 30,
    type: 'recuperacion',
    exercises: [
      { exerciseId: 'yog1', sets: 3, reps: 1 },
    ],
    completed: false,
    intensity: 40,
    caloriesBurned: 0,
  },
];

// Coach tips
export interface CoachTip {
  id: string;
  title: string;
  description: string;
  category: 'nutricion' | 'entrenamiento' | 'recuperacion' | 'motivacion';
}

export const coachTips: CoachTip[] = [
  {
    id: 't1',
    title: 'Hidratación constante',
    description: 'Bebe al menos 2 litros de agua al día. Durante el entrenamiento, hidratate cada 15-20 minutos.',
    category: 'nutricion',
  },
  {
    id: 't2',
    title: 'Descanso muscular',
    description: 'Deja al menos 48 horas de descanso entre entrenamientos del mismo grupo muscular para una óptima recuperación.',
    category: 'recuperacion',
  },
  {
    id: 't3',
    title: 'Progresión gradual',
    description: 'Aumenta el peso o las repeticiones de forma gradual, entre un 5-10% cada semana para evitar lesiones.',
    category: 'entrenamiento',
  },
  {
    id: 't4',
    title: 'Establece metas claras',
    description: 'Define objetivos SMART: Específicos, Medibles, Alcanzables, Relevantes y con Tiempo definido.',
    category: 'motivacion',
  },
  {
    id: 't5',
    title: 'Proteína post-entreno',
    description: 'Consume proteína dentro de los 30-60 minutos después del entrenamiento para optimizar la recuperación muscular.',
    category: 'nutricion',
  },
];

// Radar chart data for athlete profile
export const athleteRadarData = [
  { attribute: 'Fuerza', value: 65, fullMark: 100 },
  { attribute: 'Velocidad', value: 55, fullMark: 100 },
  { attribute: 'Potencia', value: 60, fullMark: 100 },
  { attribute: 'Resistencia', value: 70, fullMark: 100 },
  { attribute: 'Movilidad', value: 50, fullMark: 100 },
  { attribute: 'Recuperación', value: 75, fullMark: 100 },
];

// Training types
export const trainingTypes = [
  { id: 'fuerza', name: 'Fuerza', color: 'hsl(var(--primary))' },
  { id: 'resistencia', name: 'Resistencia', color: 'hsl(var(--accent))' },
  { id: 'velocidad', name: 'Velocidad', color: 'hsl(25 95% 45%)' },
  { id: 'potencia', name: 'Potencia', color: 'hsl(35 100% 50%)' },
  { id: 'movilidad', name: 'Movilidad', color: 'hsl(0 0% 60%)' },
  { id: 'recuperacion', name: 'Recuperación', color: 'hsl(120 40% 50%)' },
];
