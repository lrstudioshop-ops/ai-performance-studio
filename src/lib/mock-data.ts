// Mock data for AI Studio Performance

export interface Athlete {
  id: string;
  name: string;
  avatar: string;
  sport: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  age: number;
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
  category: 'strength' | 'endurance' | 'speed' | 'power' | 'mobility' | 'recovery';
  muscleGroups: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  equipment: string[];
  instructions: string[];
  duration: number;
  calories: number;
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

// Current athlete data
export const currentAthlete: Athlete = {
  id: '1',
  name: 'Carlos Rodríguez',
  avatar: '',
  sport: 'CrossFit',
  level: 'advanced',
  age: 28,
  weight: 82,
  height: 180,
  vo2max: 52,
  fatigueLevel: 35,
  injuryRisk: 15,
  goals: ['Aumentar fuerza máxima', 'Mejorar VO2max', 'Competir en regionales'],
  joinDate: '2024-01-15',
};

// Exercise library
export const exercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Back Squat',
    category: 'strength',
    muscleGroups: ['Cuádriceps', 'Glúteos', 'Core'],
    difficulty: 'medium',
    equipment: ['Barra', 'Rack'],
    instructions: [
      'Coloca la barra en la parte superior de los trapecios',
      'Pies a la anchura de los hombros',
      'Baja controladamente hasta paralelo',
      'Mantén el core activado durante todo el movimiento',
      'Sube explosivamente manteniendo la espalda recta',
    ],
    duration: 45,
    calories: 12,
  },
  {
    id: 'ex2',
    name: 'Deadlift',
    category: 'power',
    muscleGroups: ['Espalda baja', 'Glúteos', 'Isquiotibiales', 'Core'],
    difficulty: 'hard',
    equipment: ['Barra', 'Discos'],
    instructions: [
      'Pies a la anchura de las caderas',
      'Agarre a la anchura de los hombros',
      'Espalda recta, pecho arriba',
      'Empuja el suelo con los pies',
      'Bloquea caderas y rodillas arriba',
    ],
    duration: 50,
    calories: 15,
  },
  {
    id: 'ex3',
    name: 'Pull-ups',
    category: 'strength',
    muscleGroups: ['Dorsales', 'Bíceps', 'Core'],
    difficulty: 'medium',
    equipment: ['Barra de dominadas'],
    instructions: [
      'Agarre prono, manos separadas más que los hombros',
      'Cuerpo completamente extendido',
      'Tira de los codos hacia abajo',
      'Barbilla por encima de la barra',
      'Baja controladamente',
    ],
    duration: 30,
    calories: 8,
  },
  {
    id: 'ex4',
    name: 'Box Jumps',
    category: 'power',
    muscleGroups: ['Cuádriceps', 'Glúteos', 'Gemelos'],
    difficulty: 'medium',
    equipment: ['Cajón pliométrico'],
    instructions: [
      'Posición atlética frente al cajón',
      'Balancea los brazos hacia atrás',
      'Salta explosivamente con ambos pies',
      'Aterriza suavemente con las rodillas flexionadas',
      'Baja con control',
    ],
    duration: 25,
    calories: 10,
  },
  {
    id: 'ex5',
    name: 'Rowing Sprint',
    category: 'endurance',
    muscleGroups: ['Piernas', 'Espalda', 'Core', 'Brazos'],
    difficulty: 'hard',
    equipment: ['Máquina de remo'],
    instructions: [
      'Ajusta la resistencia al nivel adecuado',
      'Empuja primero con las piernas',
      'Tira con la espalda después',
      'Finaliza con los brazos',
      'Mantén ritmo constante',
    ],
    duration: 120,
    calories: 25,
  },
  {
    id: 'ex6',
    name: 'Hip Mobility Flow',
    category: 'mobility',
    muscleGroups: ['Caderas', 'Aductores', 'Flexores de cadera'],
    difficulty: 'easy',
    equipment: [],
    instructions: [
      'Comienza en posición de 90-90',
      'Realiza rotaciones internas y externas',
      'Transición a zancada profunda',
      'Mantén cada posición 30 segundos',
      'Respira profundamente',
    ],
    duration: 300,
    calories: 5,
  },
  {
    id: 'ex7',
    name: 'Bench Press',
    category: 'strength',
    muscleGroups: ['Pectorales', 'Tríceps', 'Deltoides'],
    difficulty: 'medium',
    equipment: ['Barra', 'Banco', 'Rack'],
    instructions: [
      'Acuéstate con los ojos bajo la barra',
      'Agarre ligeramente más ancho que los hombros',
      'Baja la barra al pecho con control',
      'Empuja explosivamente hacia arriba',
      'Mantén los pies firmes en el suelo',
    ],
    duration: 40,
    calories: 10,
  },
  {
    id: 'ex8',
    name: 'Sprint Intervals',
    category: 'speed',
    muscleGroups: ['Cuádriceps', 'Isquiotibiales', 'Gemelos', 'Core'],
    difficulty: 'hard',
    equipment: ['Pista o cinta'],
    instructions: [
      'Calentamiento de 5 minutos',
      'Sprint máximo 20 segundos',
      'Recuperación activa 40 segundos',
      'Repite 8-10 veces',
      'Enfriamiento de 5 minutos',
    ],
    duration: 600,
    calories: 80,
  },
];

// Performance metrics history
export const performanceHistory: PerformanceMetric[] = [
  { date: '2024-01-01', vo2max: 45, strength: 65, endurance: 60, speed: 55, power: 58, recovery: 70 },
  { date: '2024-02-01', vo2max: 46, strength: 68, endurance: 62, speed: 57, power: 60, recovery: 72 },
  { date: '2024-03-01', vo2max: 48, strength: 70, endurance: 65, speed: 60, power: 63, recovery: 68 },
  { date: '2024-04-01', vo2max: 49, strength: 72, endurance: 68, speed: 62, power: 65, recovery: 75 },
  { date: '2024-05-01', vo2max: 50, strength: 74, endurance: 70, speed: 65, power: 68, recovery: 73 },
  { date: '2024-06-01', vo2max: 51, strength: 76, endurance: 72, speed: 67, power: 70, recovery: 78 },
  { date: '2024-07-01', vo2max: 52, strength: 78, endurance: 75, speed: 70, power: 73, recovery: 80 },
];

// Weekly statistics
export const weeklyStats: WeeklyStats[] = [
  { week: 'Sem 1', sessions: 4, duration: 240, calories: 1200, avgIntensity: 72 },
  { week: 'Sem 2', sessions: 5, duration: 300, calories: 1500, avgIntensity: 75 },
  { week: 'Sem 3', sessions: 4, duration: 280, calories: 1400, avgIntensity: 78 },
  { week: 'Sem 4', sessions: 6, duration: 360, calories: 1800, avgIntensity: 80 },
  { week: 'Sem 5', sessions: 5, duration: 320, calories: 1600, avgIntensity: 76 },
  { week: 'Sem 6', sessions: 5, duration: 340, calories: 1700, avgIntensity: 82 },
];

// Training schedule
export const trainingSchedule: TrainingSession[] = [
  {
    id: 'ts1',
    name: 'Fuerza - Tren Inferior',
    date: '2024-07-08',
    duration: 75,
    type: 'strength',
    exercises: [
      { exerciseId: 'ex1', sets: 5, reps: 5, weight: 120 },
      { exerciseId: 'ex2', sets: 4, reps: 6, weight: 140 },
      { exerciseId: 'ex4', sets: 4, reps: 8 },
    ],
    completed: true,
    intensity: 85,
    caloriesBurned: 420,
  },
  {
    id: 'ts2',
    name: 'Cardio HIIT',
    date: '2024-07-09',
    duration: 45,
    type: 'endurance',
    exercises: [
      { exerciseId: 'ex5', sets: 4, reps: 1 },
      { exerciseId: 'ex8', sets: 1, reps: 10 },
    ],
    completed: true,
    intensity: 90,
    caloriesBurned: 380,
  },
  {
    id: 'ts3',
    name: 'Fuerza - Tren Superior',
    date: '2024-07-10',
    duration: 60,
    type: 'strength',
    exercises: [
      { exerciseId: 'ex7', sets: 5, reps: 5, weight: 90 },
      { exerciseId: 'ex3', sets: 4, reps: 10 },
    ],
    completed: false,
    intensity: 80,
    caloriesBurned: 0,
  },
  {
    id: 'ts4',
    name: 'Recuperación Activa',
    date: '2024-07-11',
    duration: 40,
    type: 'recovery',
    exercises: [
      { exerciseId: 'ex6', sets: 3, reps: 1 },
    ],
    completed: false,
    intensity: 40,
    caloriesBurned: 0,
  },
];

// AI recommendations
export interface AIRecommendation {
  id: string;
  type: 'training' | 'recovery' | 'nutrition' | 'warning';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action?: string;
}

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'ai1',
    type: 'training',
    priority: 'high',
    title: 'Aumentar volumen de piernas',
    description: 'Basado en tu progreso, puedes aumentar el volumen de entrenamiento de tren inferior en un 10% esta semana.',
    action: 'Aplicar al plan',
  },
  {
    id: 'ai2',
    type: 'recovery',
    priority: 'medium',
    title: 'Sesión de movilidad recomendada',
    description: 'Detectamos rigidez en caderas. Se recomienda una sesión de 20 min de movilidad hoy.',
    action: 'Añadir sesión',
  },
  {
    id: 'ai3',
    type: 'warning',
    priority: 'low',
    title: 'Riesgo de sobreentrenamiento',
    description: 'Tu nivel de fatiga ha aumentado un 15% esta semana. Considera reducir la intensidad mañana.',
  },
];

// Radar chart data for athlete profile
export const athleteRadarData = [
  { attribute: 'Fuerza', value: 78, fullMark: 100 },
  { attribute: 'Velocidad', value: 70, fullMark: 100 },
  { attribute: 'Potencia', value: 73, fullMark: 100 },
  { attribute: 'Resistencia', value: 75, fullMark: 100 },
  { attribute: 'Movilidad', value: 65, fullMark: 100 },
  { attribute: 'Recuperación', value: 80, fullMark: 100 },
];

// Training types with icons
export const trainingTypes = [
  { id: 'strength', name: 'Fuerza', color: 'hsl(var(--primary))', icon: 'Dumbbell' },
  { id: 'endurance', name: 'Resistencia', color: 'hsl(var(--accent))', icon: 'Heart' },
  { id: 'speed', name: 'Velocidad', color: 'hsl(var(--neon-orange))', icon: 'Zap' },
  { id: 'power', name: 'Potencia', color: 'hsl(var(--neon-purple))', icon: 'Flame' },
  { id: 'mobility', name: 'Movilidad', color: 'hsl(var(--neon-pink))', icon: 'Wind' },
  { id: 'recovery', name: 'Recuperación', color: 'hsl(var(--neon-lime))', icon: 'Moon' },
];
