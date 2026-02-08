import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { coachTips } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import {
  MessageSquare,
  Lightbulb,
  Apple,
  Dumbbell,
  Heart,
  Flame,
  ChevronRight,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const categoryIcons = {
  nutricion: Apple,
  entrenamiento: Dumbbell,
  recuperacion: Heart,
  motivacion: Flame,
};

const categoryColors = {
  nutricion: 'bg-green-500/20 text-green-400',
  entrenamiento: 'bg-primary/20 text-primary',
  recuperacion: 'bg-blue-500/20 text-blue-400',
  motivacion: 'bg-accent/20 text-accent',
};

const Coach = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTips = selectedCategory
    ? coachTips.filter((tip) => tip.category === selectedCategory)
    : coachTips;

  // Generate personalized routine based on user data
  const suggestedRoutine = {
    title: user?.sport === 'crossfit' ? 'WOD del Día' : 'Rutina Recomendada',
    description: `Basada en tu perfil de ${user?.sport || 'fitness'} y nivel ${user?.level || 'intermedio'}`,
    exercises: [
      { name: 'Calentamiento', duration: '10 min', intensity: 'Baja' },
      { name: 'Bloque Principal', duration: '30 min', intensity: 'Alta' },
      { name: 'Core', duration: '10 min', intensity: 'Media' },
      { name: 'Enfriamiento', duration: '5 min', intensity: 'Baja' },
    ],
  };

  const handleTipClick = (tipId: string) => {
    navigate(`/coach/${tipId}`);
  };

  const handleStartRoutine = () => {
    toast.success('¡Rutina iniciada! Ve a Entrenamiento para comenzar');
    navigate('/training');
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
            <MessageSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl tracking-wide">
            <span className="gradient-text">COACH</span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          Consejos personalizados y rutinas sugeridas para ti
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel - Tips */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              Todos
            </button>
            {Object.entries(categoryIcons).map(([key, Icon]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2',
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Tips List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredTips.map((tip, index) => {
              const Icon = categoryIcons[tip.category];
              const colorClass = categoryColors[tip.category];

              return (
                <motion.button
                  key={tip.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleTipClick(tip.id)}
                  className="w-full glass rounded-xl p-5 hover:border-primary/30 transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn('p-3 rounded-lg', colorClass)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{tip.title}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Right Panel - Suggested Routine */}
        <div className="space-y-6">
          {/* Suggested Routine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl tracking-wide">RUTINA SUGERIDA</h2>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{suggestedRoutine.title}</h3>
              <p className="text-sm text-muted-foreground">{suggestedRoutine.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {suggestedRoutine.exercises.map((ex, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div>
                    <p className="font-medium text-sm">{ex.name}</p>
                    <p className="text-xs text-muted-foreground">{ex.duration}</p>
                  </div>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium',
                      ex.intensity === 'Alta' && 'bg-destructive/20 text-destructive',
                      ex.intensity === 'Media' && 'bg-primary/20 text-primary',
                      ex.intensity === 'Baja' && 'bg-accent/20 text-accent'
                    )}
                  >
                    {ex.intensity}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartRoutine}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5" />
              Comenzar Rutina
            </motion.button>
          </motion.div>

          {/* User Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display text-xl tracking-wide mb-4">TU PERFIL</h3>
            <div className="space-y-3">
              {[
                { label: 'Deporte', value: user?.sport || 'No definido' },
                { label: 'Nivel', value: user?.level || 'Intermedio' },
                { label: 'Peso', value: `${user?.weight || 70} kg` },
                { label: 'Altura', value: `${user?.height || 175} cm` },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium capitalize">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <div className="text-center">
              <p className="text-3xl font-display gradient-text">15</p>
              <p className="text-sm text-muted-foreground">Sesiones completadas este mes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Coach;
