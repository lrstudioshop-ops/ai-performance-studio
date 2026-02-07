import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { currentAthlete, trainingTypes, aiRecommendations } from '@/lib/mock-data';
import {
  Brain,
  Sparkles,
  Target,
  Zap,
  Dumbbell,
  Heart,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Flame,
  Wind,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneratedPlan {
  name: string;
  duration: string;
  focus: string;
  sessions: {
    day: string;
    type: string;
    duration: number;
    exercises: string[];
  }[];
}

const AICoach = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: 'strength', label: 'Aumentar Fuerza', icon: Dumbbell },
    { id: 'endurance', label: 'Mejorar Resistencia', icon: Heart },
    { id: 'speed', label: 'Ganar Velocidad', icon: Zap },
    { id: 'power', label: 'Potencia Explosiva', icon: Flame },
    { id: 'mobility', label: 'Flexibilidad', icon: Wind },
    { id: 'recovery', label: 'Recuperación', icon: Moon },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockPlan: GeneratedPlan = {
      name: 'Plan de Hipertrofia y Fuerza',
      duration: '8 semanas',
      focus: selectedGoal || 'strength',
      sessions: [
        {
          day: 'Lunes',
          type: 'Tren Superior - Empuje',
          duration: 60,
          exercises: ['Bench Press 4x8', 'OHP 3x10', 'Dips 3x12', 'Lateral Raises 3x15'],
        },
        {
          day: 'Martes',
          type: 'Tren Inferior - Cuádriceps',
          duration: 70,
          exercises: ['Back Squat 5x5', 'Leg Press 4x12', 'Lunges 3x10', 'Leg Extension 3x15'],
        },
        {
          day: 'Miércoles',
          type: 'Recuperación Activa',
          duration: 40,
          exercises: ['Mobility Flow', 'Foam Rolling', 'Light Cardio 20min'],
        },
        {
          day: 'Jueves',
          type: 'Tren Superior - Tirón',
          duration: 60,
          exercises: ['Deadlift 5x5', 'Pull-ups 4x8', 'Rows 4x10', 'Face Pulls 3x15'],
        },
        {
          day: 'Viernes',
          type: 'Tren Inferior - Posterior',
          duration: 65,
          exercises: ['RDL 4x8', 'Hip Thrust 4x10', 'Leg Curl 3x12', 'Calf Raises 4x15'],
        },
      ],
    };

    setGeneratedPlan(mockPlan);
    setIsGenerating(false);
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold">
            <span className="gradient-text">IA Coach</span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          Tu entrenador personal impulsado por inteligencia artificial
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Goal Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">¿Cuál es tu objetivo?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goals.map((goal, index) => (
                <motion.button
                  key={goal.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={cn(
                    'p-4 rounded-xl border transition-all duration-300 text-left',
                    selectedGoal === goal.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-secondary/30 border-border hover:border-primary/50'
                  )}
                >
                  <goal.icon
                    className={cn(
                      'h-6 w-6 mb-2',
                      selectedGoal === goal.id ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                  <p className="font-medium text-sm">{goal.label}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* AI Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">
              Cuéntame más sobre ti
            </h2>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Quiero ganar fuerza en tren superior, tengo 3 días a la semana disponibles y acceso a un gimnasio completo..."
                className="w-full h-32 p-4 bg-secondary/50 border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Motor IA v3.2 - Optimizado para rendimiento deportivo</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all',
                    isGenerating
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow'
                  )}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Generar Plan
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Generated Plan */}
          <AnimatePresence mode="wait">
            {generatedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-sm text-accent font-medium">Plan generado</span>
                    </div>
                    <h2 className="font-display font-semibold text-xl">{generatedPlan.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Duración: {generatedPlan.duration}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium"
                  >
                    Aplicar Plan
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {generatedPlan.sessions.map((session, index) => (
                    <motion.div
                      key={session.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs text-muted-foreground">{session.day}</span>
                          <h3 className="font-medium">{session.type}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {session.duration} min
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {session.exercises.map((ex, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-background/50 rounded text-xs"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - AI Insights */}
        <div className="space-y-6">
          {/* Athlete Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Tu Perfil</h3>
            <div className="space-y-3">
              {[
                { label: 'Deporte', value: currentAthlete.sport },
                { label: 'Nivel', value: currentAthlete.level },
                { label: 'VO2max', value: `${currentAthlete.vo2max} ml/kg/min` },
                { label: 'Fatiga', value: `${currentAthlete.fatigueLevel}%` },
                { label: 'Riesgo Lesión', value: `${currentAthlete.injuryRisk}%` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">
              Recomendaciones IA
            </h3>
            <div className="space-y-3">
              {aiRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className={cn(
                    'p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02]',
                    rec.type === 'training' && 'bg-primary/5 border-primary/30',
                    rec.type === 'recovery' && 'bg-accent/5 border-accent/30',
                    rec.type === 'warning' && 'bg-neon-orange/5 border-neon-orange/30'
                  )}
                >
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {rec.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-neon-purple/10 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm">Motor IA Activo</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-2xl font-display font-bold text-primary">147</p>
                <p className="text-xs text-muted-foreground">Métricas analizadas</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-accent">98%</p>
                <p className="text-xs text-muted-foreground">Precisión</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AICoach;
