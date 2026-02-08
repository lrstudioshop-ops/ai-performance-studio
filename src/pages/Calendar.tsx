import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { trainingSchedule as initialSchedule } from '@/lib/mock-data';
import { ChevronLeft, ChevronRight, Plus, Dumbbell, Clock, Flame, X, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import NewSessionModal, { CreatedSession } from '@/components/calendar/NewSessionModal';
import { toast } from 'sonner';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [sessions, setSessions] = useState(initialSchedule);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

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
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateStr = `${year}-${month}-${dayStr}`;
    return sessions.filter((s) => s.date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
    setSelectedDay(null);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  const handleSessionCreated = (session: CreatedSession) => {
    const newSession = {
      id: session.id,
      name: session.name,
      date: session.date,
      duration: session.duration,
      type: session.type,
      exercises: [],
      completed: false,
      intensity: session.intensity,
      caloriesBurned: 0,
    };
    setSessions([...sessions, newSession]);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    setSelectedSession(null);
    toast.success('Sesión eliminada correctamente');
  };

  const handleCompleteSession = (sessionId: string) => {
    setSessions(sessions.map(s => 
      s.id === sessionId ? { ...s, completed: !s.completed } : s
    ));
    const session = sessions.find(s => s.id === sessionId);
    toast.success(session?.completed ? 'Sesión marcada como pendiente' : '¡Sesión completada!');
  };

  const selectedDaySessions = selectedDay ? getSessionsForDay(selectedDay) : [];

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
            <span className="gradient-text">CALENDARIO</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Visualiza y planifica tus sesiones de entrenamiento
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsNewSessionModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold orange-glow"
        >
          <Plus className="h-5 w-5" />
          Nueva Sesión
        </motion.button>
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
              const daySessions = day ? getSessionsForDay(day) : [];
              const hasTraining = daySessions.length > 0;
              const allCompleted = daySessions.length > 0 && daySessions.every(s => s.completed);
              const isSelected = day === selectedDay;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.02 * index }}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    'aspect-square p-2 rounded-lg border transition-all duration-300 cursor-pointer relative',
                    day === null && 'invisible',
                    day !== null && 'hover:border-primary/50 hover:bg-primary/5',
                    isToday(day || 0) && 'border-primary bg-primary/10',
                    isSelected && 'ring-2 ring-primary border-primary',
                    hasTraining && !isToday(day || 0) && !isSelected && 'border-accent/30 bg-accent/5',
                    !hasTraining && !isToday(day || 0) && !isSelected && 'border-border bg-secondary/20'
                  )}
                >
                  {day !== null && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            'text-sm font-medium',
                            isToday(day) && 'text-primary'
                          )}
                        >
                          {day}
                        </span>
                        {allCompleted && (
                          <CheckCircle2 className="h-3 w-3 text-accent" />
                        )}
                      </div>
                      {hasTraining && (
                        <div className="mt-auto space-y-1">
                          {daySessions.slice(0, 2).map((session) => (
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
                          {daySessions.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{daySessions.length - 2} más
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

          {/* Selected Day Detail */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg">
                    {selectedDay} DE {monthNames[currentDate.getMonth()].toUpperCase()}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsNewSessionModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Añadir sesión
                  </motion.button>
                </div>
                
                {selectedDaySessions.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedDaySessions.map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          'p-4 rounded-xl border transition-all',
                          session.completed
                            ? 'bg-accent/10 border-accent/30'
                            : 'bg-secondary/30 border-border'
                        )}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              'p-2 rounded-lg',
                              session.completed ? 'bg-accent/20' : 'bg-primary/20'
                            )}>
                              <Dumbbell className={cn(
                                'h-5 w-5',
                                session.completed ? 'text-accent' : 'text-primary'
                              )} />
                            </div>
                            <div>
                              <p className="font-semibold">{session.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{session.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleCompleteSession(session.id)}
                              className={cn(
                                'p-2 rounded-lg transition-colors',
                                session.completed 
                                  ? 'bg-accent/20 text-accent'
                                  : 'hover:bg-primary/20 text-muted-foreground hover:text-primary'
                              )}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteSession(session.id)}
                              className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-4 w-4" />
                            {session.intensity}% intensidad
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No hay sesiones programadas</p>
                    <p className="text-sm mt-1">Haz clic en "Añadir sesión" para crear una</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl tracking-wide">PRÓXIMAS</h2>
            <span className="text-sm text-muted-foreground">
              {sessions.filter(s => !s.completed).length} pendientes
            </span>
          </div>

          <div className="space-y-4">
            {sessions
              .filter(s => !s.completed)
              .slice(0, 5)
              .map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  onClick={() => setSelectedSession(selectedSession === session.id ? null : session.id)}
                  className={cn(
                    'p-4 rounded-lg border transition-all duration-300 cursor-pointer',
                    selectedSession === session.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-secondary/30 border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Dumbbell className="h-4 w-4 text-primary" />
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
                          {session.intensity}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded actions */}
                  <AnimatePresence>
                    {selectedSession === session.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-border flex gap-2"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteSession(session.id);
                          }}
                          className="flex-1 py-2 rounded-lg bg-accent/20 text-accent text-xs font-medium"
                        >
                          Completar
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSession(session.id);
                          }}
                          className="flex-1 py-2 rounded-lg bg-destructive/20 text-destructive text-xs font-medium"
                        >
                          Eliminar
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsNewSessionModalOpen(true)}
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
            { 
              label: 'Sesiones Completadas', 
              value: sessions.filter(s => s.completed).length.toString(), 
              total: sessions.length.toString() 
            },
            { 
              label: 'Tiempo Total', 
              value: `${Math.round(sessions.filter(s => s.completed).reduce((acc, s) => acc + s.duration, 0) / 60)}h`, 
              total: `${Math.round(sessions.reduce((acc, s) => acc + s.duration, 0) / 60)}h` 
            },
            { 
              label: 'Calorías Quemadas', 
              value: sessions.filter(s => s.completed).reduce((acc, s) => acc + s.caloriesBurned, 0).toLocaleString(), 
              unit: 'kcal' 
            },
            { 
              label: 'Días de Descanso', 
              value: '6', 
              total: '8' 
            },
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

      {/* New Session Modal */}
      <NewSessionModal
        isOpen={isNewSessionModalOpen}
        onClose={() => setIsNewSessionModalOpen(false)}
        selectedDate={selectedDay ? new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay) : undefined}
        onSessionCreated={handleSessionCreated}
      />
    </MainLayout>
  );
};

export default Calendar;
