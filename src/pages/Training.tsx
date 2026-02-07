import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { trainingSchedule, exercises, trainingTypes } from '@/lib/mock-data';
import {
  Play,
  Pause,
  SkipForward,
  Clock,
  Flame,
  Dumbbell,
  CheckCircle2,
  ChevronRight,
  Target,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Training = () => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const selectedSession = trainingSchedule.find((s) => s.id === activeSession);

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold">
          <span className="gradient-text">Entrenamiento</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tus sesiones y sigue tu progreso en tiempo real
        </p>
      </motion.div>

      {/* Training Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="font-display font-semibold text-lg mb-4">Tipos de Entrenamiento</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trainingTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-xl glass border border-border hover:border-primary/50 transition-all duration-300 text-center group"
            >
              <div
                className="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${type.color}20` }}
              >
                {type.id === 'strength' && <Dumbbell className="h-6 w-6" style={{ color: type.color }} />}
                {type.id === 'endurance' && <Target className="h-6 w-6" style={{ color: type.color }} />}
                {type.id === 'speed' && <Zap className="h-6 w-6" style={{ color: type.color }} />}
                {type.id === 'power' && <Flame className="h-6 w-6" style={{ color: type.color }} />}
                {type.id === 'mobility' && <Target className="h-6 w-6" style={{ color: type.color }} />}
                {type.id === 'recovery' && <Clock className="h-6 w-6" style={{ color: type.color }} />}
              </div>
              <span className="text-sm font-medium">{type.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions List */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">Sesiones Programadas</h2>
            <div className="space-y-3">
              {trainingSchedule.map((session, index) => (
                <motion.button
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  onClick={() => setActiveSession(session.id)}
                  className={cn(
                    'w-full p-4 rounded-lg border text-left transition-all duration-300',
                    activeSession === session.id
                      ? 'bg-primary/10 border-primary'
                      : session.completed
                      ? 'bg-accent/5 border-accent/30'
                      : 'bg-secondary/30 border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {session.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      ) : (
                        <Dumbbell className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{session.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('es', {
                            weekday: 'short',
                            day: 'numeric',
                          })}
                          {' • '}
                          {session.duration} min
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Session Detail / Active Training */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedSession ? (
              <motion.div
                key={selectedSession.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-xl p-6"
              >
                {/* Session Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-semibold text-xl">{selectedSession.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedSession.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {selectedSession.intensity}% intensidad
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-4 w-4" />
                        ~{selectedSession.exercises.length * 100} kcal
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsRunning(!isRunning)}
                    className={cn(
                      'p-4 rounded-xl transition-all duration-300',
                      isRunning
                        ? 'bg-accent text-accent-foreground neon-glow-accent'
                        : 'bg-primary text-primary-foreground neon-glow'
                    )}
                  >
                    {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </motion.button>
                </div>

                {/* Exercise List */}
                <div className="space-y-4">
                  {selectedSession.exercises.map((ex, index) => {
                    const exercise = exercises.find((e) => e.id === ex.exerciseId);
                    if (!exercise) return null;

                    const isActive = currentExercise === index && isRunning;
                    const isCompleted = index < currentExercise;

                    return (
                      <motion.div
                        key={ex.exerciseId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className={cn(
                          'p-4 rounded-lg border transition-all duration-300',
                          isActive && 'bg-primary/10 border-primary animate-pulse',
                          isCompleted && 'bg-accent/10 border-accent/30',
                          !isActive && !isCompleted && 'bg-secondary/30 border-border'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold',
                              isActive && 'bg-primary text-primary-foreground',
                              isCompleted && 'bg-accent text-accent-foreground',
                              !isActive && !isCompleted && 'bg-secondary text-muted-foreground'
                            )}
                          >
                            {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {ex.sets} series × {ex.reps} reps
                              {ex.weight && ` @ ${ex.weight}kg`}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {exercise.muscleGroups.slice(0, 2).map((muscle, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                    disabled={currentExercise === 0}
                    className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-50 transition-all"
                  >
                    Anterior
                  </button>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Ejercicio</p>
                    <p className="font-display font-bold text-lg">
                      {currentExercise + 1} / {selectedSession.exercises.length}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentExercise(
                        Math.min(selectedSession.exercises.length - 1, currentExercise + 1)
                      )
                    }
                    disabled={currentExercise === selectedSession.exercises.length - 1}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    Siguiente
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-12 text-center"
              >
                <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">
                  Selecciona una sesión
                </h3>
                <p className="text-muted-foreground">
                  Elige una sesión de la lista para ver los detalles y comenzar tu entrenamiento
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default Training;
