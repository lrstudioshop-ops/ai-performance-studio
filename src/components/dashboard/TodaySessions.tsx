import { motion } from 'framer-motion';
import { trainingSchedule, exercises } from '@/lib/mock-data';
import { CheckCircle2, Circle, Clock, Flame, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';

const TodaySessions = () => {
  const todaySessions = trainingSchedule.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg">Sesiones de Hoy</h3>
          <p className="text-sm text-muted-foreground">Tu plan de entrenamiento</p>
        </div>
        <button className="text-sm text-primary hover:underline">Ver calendario →</button>
      </div>

      <div className="space-y-4">
        {todaySessions.map((session, index) => {
          const sessionExercises = session.exercises.map((e) =>
            exercises.find((ex) => ex.id === e.exerciseId)
          );

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={cn(
                'relative p-4 rounded-lg border transition-all duration-300',
                session.completed
                  ? 'bg-accent/10 border-accent/30'
                  : 'bg-secondary/30 border-border hover:border-primary/50'
              )}
            >
              {/* Status indicator */}
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    session.completed ? 'bg-accent/20' : 'bg-primary/20'
                  )}
                >
                  {session.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : (
                    <Dumbbell className="h-5 w-5 text-primary" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{session.name}</h4>
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        session.completed
                          ? 'bg-accent/20 text-accent'
                          : 'bg-primary/20 text-primary'
                      )}
                    >
                      {session.completed ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {session.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {session.completed ? session.caloriesBurned : '~' + session.exercises.length * 100} kcal
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    {sessionExercises.slice(0, 3).map((ex, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground"
                      >
                        {ex?.name}
                      </span>
                    ))}
                    {sessionExercises.length > 3 && (
                      <span className="px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground">
                        +{sessionExercises.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar for intensity */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Intensidad objetivo</span>
                  <span className="font-medium">{session.intensity}%</span>
                </div>
                <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${session.intensity}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className={cn(
                      'h-full rounded-full',
                      session.completed ? 'bg-accent' : 'bg-primary'
                    )}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-3 rounded-lg bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-colors"
      >
        Iniciar Siguiente Sesión
      </motion.button>
    </motion.div>
  );
};

export default TodaySessions;
