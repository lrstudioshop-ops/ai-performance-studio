import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Target, Dumbbell, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trainingTypes } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface NewSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onSessionCreated: (session: CreatedSession) => void;
}

export interface CreatedSession {
  id: string;
  name: string;
  date: string;
  type: string;
  duration: number;
  intensity: number;
  exercises: string[];
}

const durations = [
  { value: 30, label: '30 min', description: 'Sesión rápida' },
  { value: 45, label: '45 min', description: 'Sesión estándar' },
  { value: 60, label: '60 min', description: 'Sesión completa' },
  { value: 90, label: '90 min', description: 'Sesión intensiva' },
];

const intensities = [
  { value: 50, label: 'Baja', description: 'Recuperación activa', color: 'bg-green-500' },
  { value: 70, label: 'Media', description: 'Entrenamiento moderado', color: 'bg-yellow-500' },
  { value: 85, label: 'Alta', description: 'Entrenamiento intenso', color: 'bg-orange-500' },
  { value: 95, label: 'Máxima', description: 'Rendimiento máximo', color: 'bg-red-500' },
];

const NewSessionModal = ({ isOpen, onClose, selectedDate, onSessionCreated }: NewSessionModalProps) => {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [sessionName, setSessionName] = useState('');
  const [sessionDate, setSessionDate] = useState(
    selectedDate ? selectedDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [sessionType, setSessionType] = useState('');
  const [sessionDuration, setSessionDuration] = useState(45);
  const [sessionIntensity, setSessionIntensity] = useState(70);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleCreateSession();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return sessionName.trim().length > 0;
      case 2:
        return sessionType.length > 0;
      case 3:
        return sessionDuration > 0;
      case 4:
        return sessionIntensity > 0;
      default:
        return true;
    }
  };

  const handleCreateSession = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newSession: CreatedSession = {
        id: `new-${Date.now()}`,
        name: sessionName,
        date: sessionDate,
        type: sessionType,
        duration: sessionDuration,
        intensity: sessionIntensity,
        exercises: getRecommendedExercises(),
      };
      
      onSessionCreated(newSession);
      toast.success('¡Sesión creada con éxito!', {
        description: `${sessionName} programada para ${new Date(sessionDate).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}`,
      });
      handleReset();
      onClose();
    }, 1500);
  };

  const getRecommendedExercises = () => {
    // Return recommended exercises based on type
    const exercisesByType: Record<string, string[]> = {
      fuerza: ['Press de Banca', 'Sentadilla', 'Peso Muerto', 'Dominadas'],
      resistencia: ['Carrera Continua', 'Burpees', 'Wall Balls', 'Saltar Cuerda'],
      velocidad: ['Sprints', 'Intervalos', 'Skipping', 'Saltos Laterales'],
      potencia: ['Box Jumps', 'Clean & Jerk', 'Snatch', 'Kettlebell Swing'],
      movilidad: ['Yoga Flow', 'Estiramientos Dinámicos', 'Foam Rolling', 'Movilidad Articular'],
      recuperacion: ['Caminar', 'Estiramientos Suaves', 'Respiración', 'Masaje'],
    };
    return exercisesByType[sessionType] || [];
  };

  const handleReset = () => {
    setStep(1);
    setSessionName('');
    setSessionType('');
    setSessionDuration(45);
    setSessionIntensity(70);
    setIsGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-display text-xl tracking-wide">NUEVA SESIÓN</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Paso {step} de 4 • {user?.sport || 'Fitness'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-6 pt-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'flex-1 h-1.5 rounded-full transition-all duration-300',
                    s <= step ? 'bg-primary' : 'bg-secondary'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[320px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Name & Date */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-lg">INFORMACIÓN BÁSICA</h3>
                    <p className="text-sm text-muted-foreground">Nombra tu sesión y selecciona la fecha</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre de la sesión</label>
                      <input
                        type="text"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        placeholder="Ej: Entrenamiento de Fuerza"
                        className="w-full h-12 px-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Fecha</label>
                      <input
                        type="date"
                        value={sessionDate}
                        onChange={(e) => setSessionDate(e.target.value)}
                        className="w-full h-12 px-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Type */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-lg">TIPO DE ENTRENAMIENTO</h3>
                    <p className="text-sm text-muted-foreground">Selecciona el enfoque principal</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {trainingTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSessionType(type.id)}
                        className={cn(
                          'p-4 rounded-xl border text-left transition-all',
                          sessionType === type.id
                            ? 'bg-primary/20 border-primary'
                            : 'bg-secondary/30 border-border hover:border-primary/50'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{type.name}</span>
                        </div>
                        {sessionType === type.id && (
                          <Check className="absolute top-2 right-2 h-5 w-5 text-primary" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Duration */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-lg">DURACIÓN</h3>
                    <p className="text-sm text-muted-foreground">¿Cuánto tiempo dedicarás?</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {durations.map((d) => (
                      <motion.button
                        key={d.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSessionDuration(d.value)}
                        className={cn(
                          'p-4 rounded-xl border text-center transition-all',
                          sessionDuration === d.value
                            ? 'bg-primary/20 border-primary'
                            : 'bg-secondary/30 border-border hover:border-primary/50'
                        )}
                      >
                        <p className="font-display text-xl">{d.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{d.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Intensity */}
              {step === 4 && !isGenerating && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-display text-lg">INTENSIDAD</h3>
                    <p className="text-sm text-muted-foreground">¿Qué nivel de esfuerzo deseas?</p>
                  </div>
                  
                  <div className="space-y-3">
                    {intensities.map((i) => (
                      <motion.button
                        key={i.value}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSessionIntensity(i.value)}
                        className={cn(
                          'w-full p-4 rounded-xl border flex items-center gap-4 transition-all',
                          sessionIntensity === i.value
                            ? 'bg-primary/20 border-primary'
                            : 'bg-secondary/30 border-border hover:border-primary/50'
                        )}
                      >
                        <div className={cn('w-3 h-3 rounded-full', i.color)} />
                        <div className="flex-1 text-left">
                          <p className="font-medium">{i.label} ({i.value}%)</p>
                          <p className="text-xs text-muted-foreground">{i.description}</p>
                        </div>
                        {sessionIntensity === i.value && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Generating */}
              {isGenerating && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[280px]"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Dumbbell className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary" />
                  </div>
                  <p className="font-display text-lg mt-6">GENERANDO SESIÓN</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Optimizando ejercicios para tu nivel...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!isGenerating && (
            <div className="flex items-center justify-between p-6 border-t border-border">
              <button
                onClick={step === 1 ? onClose : handleBack}
                className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {step === 1 ? 'Cancelar' : 'Atrás'}
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={cn(
                  'px-6 py-3 rounded-xl font-semibold transition-all',
                  canProceed()
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {step === 4 ? 'Crear Sesión' : 'Siguiente'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewSessionModal;
