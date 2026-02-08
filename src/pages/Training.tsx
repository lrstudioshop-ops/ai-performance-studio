import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { trainingSchedule, exercises, trainingTypes, exercisesBySport } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import { useSession } from '@/contexts/SessionContext';
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
  Filter,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Training = () => {
  const { user } = useUser();
  const { sessionExercises, clearSession } = useSession();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Get exercises based on user's sport
  const userSportExercises = user?.sport ? exercisesBySport[user.sport] || [] : [];
  const allExercises = [...userSportExercises, ...exercises];

  // Filter sessions by type
  const filteredSessions = useMemo(() => {
    if (!selectedType) return trainingSchedule;
    return trainingSchedule.filter(s => s.type === selectedType);
  }, [selectedType]);

  // Generate dynamic sessions based on selected type
  const dynamicSessions = useMemo(() => {
    if (!selectedType) return filteredSessions;
    
    // Filter exercises by category
    const typeExercises = allExercises.filter(ex => ex.category === selectedType);
    
    if (typeExercises.length === 0) return filteredSessions;
    
    // Generate 3 sample sessions for the selected type
    const typeName = trainingTypes.find(t => t.id === selectedType)?.name || selectedType;
    
    return [
      {
        id: `${selectedType}-1`,
        name: `${typeName} - Principiante`,
        date: new Date().toISOString().split('T')[0],
        duration: 30,
        type: selectedType,
        exercises: typeExercises.slice(0, 3).map(ex => ({
          exerciseId: ex.id,
          sets: 3,
          reps: 10,
        })),
        completed: false,
        intensity: 60,
        caloriesBurned: 0,
      },
      {
        id: `${selectedType}-2`,
        name: `${typeName} - Intermedio`,
        date: new Date().toISOString().split('T')[0],
        duration: 45,
        type: selectedType,
        exercises: typeExercises.slice(0, 4).map(ex => ({
          exerciseId: ex.id,
          sets: 4,
          reps: 12,
        })),
        completed: false,
        intensity: 75,
        caloriesBurned: 0,
      },
      {
        id: `${selectedType}-3`,
        name: `${typeName} - Avanzado`,
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        type: selectedType,
        exercises: typeExercises.slice(0, 5).map(ex => ({
          exerciseId: ex.id,
          sets: 5,
          reps: 8,
          weight: 40,
        })),
        completed: false,
        intensity: 85,
        caloriesBurned: 0,
      },
      ...filteredSessions,
    ];
  }, [selectedType, filteredSessions, allExercises]);

  const selectedSession = dynamicSessions.find((s) => s.id === activeSession);

  const handleStartSession = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.success('¡Sesión iniciada!', {
        description: 'Sigue el ritmo y da lo mejor de ti',
      });
    }
  };

  const handleCompleteExercise = () => {
    if (selectedSession && currentExercise < selectedSession.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      toast.success('¡Ejercicio completado!');
    } else {
      setIsRunning(false);
      toast.success('¡Sesión completada!', {
        description: 'Excelente trabajo. Recuerda hidratarte.',
      });
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-4xl tracking-wide">
            <span className="gradient-text">ENTRENAMIENTO</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tus sesiones y sigue tu progreso en tiempo real
          </p>
        </div>
        
        {/* Session from exercises */}
        {sessionExercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <div className="px-4 py-2 rounded-xl bg-accent/10 border border-accent/30">
              <p className="text-sm font-medium text-accent">
                {sessionExercises.length} ejercicios seleccionados
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearSession}
              className="p-2 rounded-lg bg-secondary hover:bg-destructive/20 hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Training Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl tracking-wide">TIPOS DE ENTRENAMIENTO</h2>
          {selectedType && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedType(null)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm"
            >
              <Filter className="h-4 w-4" />
              Limpiar filtro
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trainingTypes.map((type, index) => {
            const isSelected = selectedType === type.id;
            const exerciseCount = allExercises.filter(ex => ex.category === type.id).length;
            
            return (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(isSelected ? null : type.id)}
                className={cn(
                  'p-4 rounded-xl glass border transition-all duration-300 text-center group',
                  isSelected
                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/20'
                  )}
                >
                  <Dumbbell className={cn('h-6 w-6', isSelected ? 'text-primary-foreground' : 'text-primary')} />
                </div>
                <span className="text-sm font-medium block">{type.name}</span>
                <span className="text-xs text-muted-foreground">{exerciseCount} ejercicios</span>
              </motion.button>
            );
          })}
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
            <h2 className="font-display text-xl tracking-wide mb-4">
              {selectedType 
                ? `SESIONES DE ${trainingTypes.find(t => t.id === selectedType)?.name.toUpperCase()}`
                : 'SESIONES PROGRAMADAS'
              }
            </h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {dynamicSessions.map((session, index) => (
                <motion.button
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  onClick={() => {
                    setActiveSession(session.id);
                    setCurrentExercise(0);
                    setIsRunning(false);
                  }}
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
                          {session.duration} min • {session.intensity}% intensidad
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
                    <h2 className="font-display text-2xl tracking-wide">{selectedSession.name.toUpperCase()}</h2>
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
                    onClick={handleStartSession}
                    className={cn(
                      'p-4 rounded-xl transition-all duration-300',
                      isRunning
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-gradient-to-r from-primary to-accent text-primary-foreground orange-glow'
                    )}
                  >
                    {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </motion.button>
                </div>

                {/* Progress bar */}
                {isRunning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="text-primary font-medium">
                        {Math.round((currentExercise / selectedSession.exercises.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentExercise / selectedSession.exercises.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Exercise List */}
                <div className="space-y-4">
                  {selectedSession.exercises.map((ex, index) => {
                    const exercise = allExercises.find((e) => e.id === ex.exerciseId);
                    if (!exercise) return null;

                    const isActive = currentExercise === index && isRunning;
                    const isCompleted = index < currentExercise;

                    return (
                      <motion.div
                        key={ex.exerciseId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        onClick={() => !isRunning && setCurrentExercise(index)}
                        className={cn(
                          'p-4 rounded-lg border transition-all duration-300 cursor-pointer',
                          isActive && 'bg-primary/10 border-primary',
                          isCompleted && 'bg-accent/10 border-accent/30',
                          !isActive && !isCompleted && 'bg-secondary/30 border-border hover:border-primary/50'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold transition-all',
                              isActive && 'bg-primary text-primary-foreground animate-pulse',
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
                              {'weight' in ex && ex.weight && ` @ ${ex.weight}kg`}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {exercise.muscleGroups.slice(0, 2).map((muscle, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground hidden md:inline-block"
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
                    <p className="font-display text-lg">
                      {currentExercise + 1} / {selectedSession.exercises.length}
                    </p>
                  </div>
                  <button
                    onClick={handleCompleteExercise}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground transition-all flex items-center gap-2"
                  >
                    {currentExercise === selectedSession.exercises.length - 1 ? 'Finalizar' : 'Siguiente'}
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
                <h3 className="font-display text-xl mb-2">SELECCIONA UNA SESIÓN</h3>
                <p className="text-muted-foreground mb-4">
                  Elige una sesión de la lista o filtra por tipo de entrenamiento
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary">{dynamicSessions.length}</span> sesiones disponibles
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
