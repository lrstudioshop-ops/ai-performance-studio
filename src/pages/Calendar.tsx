import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { trainingSchedule } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, Plus, Dumbbell, Clock, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const getSessionsForDay = (day: number) => {
    const dateStr = `2024-07-${day.toString().padStart(2, '0')}`;
    return trainingSchedule.filter((s) => s.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-wide">
          <span className="gradient-text">CALENDARIO</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Visualiza y planifica tus sesiones de entrenamiento
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 glass rounded-xl p-6"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl tracking-wide">
              {monthNames[currentDate.getMonth()].toUpperCase()} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                Hoy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const sessions = day ? getSessionsForDay(day) : [];
              const hasTraining = sessions.length > 0;
              const isCompleted = sessions.some((s) => s.completed);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.02 * index }}
                  className={cn(
                    'aspect-square p-2 rounded-lg border transition-all duration-300 cursor-pointer',
                    day === null && 'invisible',
                    day !== null && 'hover:border-primary/50',
                    isToday(day || 0) && 'border-primary bg-primary/10',
                    hasTraining && !isToday(day || 0) && 'border-accent/30 bg-accent/5',
                    !hasTraining && !isToday(day || 0) && 'border-border bg-secondary/20'
                  )}
                >
                  {day !== null && (
                    <div className="h-full flex flex-col">
                      <span
                        className={cn(
                          'text-sm font-medium',
                          isToday(day) && 'text-primary'
                        )}
                      >
                        {day}
                      </span>
                      {hasTraining && (
                        <div className="mt-auto space-y-1">
                          {sessions.slice(0, 2).map((session) => (
                            <div
                              key={session.id}
                              className={cn(
                                'text-xs px-1.5 py-0.5 rounded truncate',
                                session.completed
                                  ? 'bg-accent/20 text-accent'
                                  : 'bg-primary/20 text-primary'
                              )}
                            >
                              {session.name.split(' ')[0]}
                            </div>
                          ))}
                          {sessions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{sessions.length - 2} más
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl tracking-wide">PRÓXIMAS SESIONES</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="space-y-4">
            {trainingSchedule.slice(0, 5).map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className={cn(
                  'p-4 rounded-lg border transition-all duration-300 hover:border-primary/50',
                  session.completed
                    ? 'bg-accent/5 border-accent/20'
                    : 'bg-secondary/30 border-border'
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      session.completed ? 'bg-accent/20' : 'bg-primary/20'
                    )}
                  >
                    <Dumbbell
                      className={cn(
                        'h-4 w-4',
                        session.completed ? 'text-accent' : 'text-primary'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{session.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(session.date).toLocaleDateString('es', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="h-3 w-3" />
                        ~{session.exercises.length * 100} kcal
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
          >
            Generar Nueva Sesión
          </motion.button>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 glass rounded-xl p-6"
      >
        <h2 className="font-display text-xl tracking-wide mb-4">RESUMEN DEL MES</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Sesiones Completadas', value: '18', total: '24' },
            { label: 'Tiempo Total', value: '22h', total: '30h' },
            { label: 'Calorías Quemadas', value: '8,400', unit: 'kcal' },
            { label: 'Días de Descanso', value: '6', total: '8' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-2xl">{stat.value}</span>
                {stat.total && (
                  <span className="text-sm text-muted-foreground">/ {stat.total}</span>
                )}
                {stat.unit && (
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Calendar;
