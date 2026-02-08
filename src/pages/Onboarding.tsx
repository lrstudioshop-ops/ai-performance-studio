import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, UserProfile } from '@/contexts/UserContext';
import {
  User,
  Scale,
  Ruler,
  Dumbbell,
  Trophy,
  ChevronRight,
  ChevronLeft,
  Check,
  Play,
} from 'lucide-react';
import { toast } from 'sonner';

const sports = [
  { id: 'crossfit', name: 'Crossfit', icon: '🏋️' },
  { id: 'natacion', name: 'Natación', icon: '🏊' },
  { id: 'running', name: 'Running', icon: '🏃' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'yoga', name: 'Yoga', icon: '🧘' },
  { id: 'ciclismo', name: 'Ciclismo', icon: '🚴' },
];

const levels: { id: 'bajo' | 'intermedio' | 'elite' | 'profesional'; name: string; description: string }[] = [
  { id: 'bajo', name: 'Bajo', description: 'Menos de 6 meses entrenando' },
  { id: 'intermedio', name: 'Intermedio', description: '6 meses - 2 años' },
  { id: 'elite', name: 'Élite', description: '2-5 años de experiencia' },
  { id: 'profesional', name: 'Profesional', description: 'Más de 5 años' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUser, user } = useUser();
  const [step, setStep] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [formData, setFormData] = useState<{
    name: string;
    weight: number;
    height: number;
    sport: string;
    level: 'bajo' | 'intermedio' | 'elite' | 'profesional';
  }>({
    name: user?.name || '',
    weight: user?.weight || 70,
    height: user?.height || 175,
    sport: user?.sport || '',
    level: user?.level || 'intermedio',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Video simulation effect
  useEffect(() => {
    if (showVideo) {
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Save user and navigate to dashboard
              const newUser: UserProfile = {
                ...formData,
                hasCompletedOnboarding: true,
              };
              setUser(newUser);
              navigate('/dashboard');
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showVideo, formData, setUser, navigate]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'El nombre es obligatorio';
        } else if (formData.name.trim().length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }
        if (formData.weight < 30 || formData.weight > 300) {
          newErrors.weight = 'Peso debe estar entre 30 y 300 kg';
        }
        if (formData.height < 100 || formData.height > 250) {
          newErrors.height = 'Altura debe estar entre 100 y 250 cm';
        }
        break;
      case 2:
        if (!formData.sport) {
          newErrors.sport = 'Selecciona un deporte';
        }
        break;
      case 3:
        // Level always has a default, so valid
        break;
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Show video before completing
      setShowVideo(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0 && formData.weight > 0 && formData.height > 0;
      case 2:
        return formData.sport !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Video screen
  if (showVideo) {
    return (
      <div className="fixed inset-0 bg-background overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-background via-larios-black to-background"
        >
          {/* Animated background elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/30 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl"
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-8 orange-glow"
            >
              <Dumbbell className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-6xl tracking-widest mb-4 text-center"
            >
              <span className="gradient-text">¡BIENVENIDO, {formData.name.toUpperCase()}!</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground text-center mb-8"
            >
              Preparando tu experiencia personalizada...
            </motion.p>

            {/* Motivational video simulation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-md space-y-4"
            >
              {/* Video thumbnail simulation */}
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm text-center text-muted-foreground">
                    🏋️ Crossfit • 🏊 Natación • 🏃 Running • 💪 Fitness
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${videoProgress}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                {videoProgress < 100 ? 'Cargando tu plan personalizado...' : '¡Listo!'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
          className="h-full bg-gradient-to-r from-primary to-accent"
        />
      </div>

      {/* Header */}
      <div className="pt-8 pb-4 px-6 text-center">
        <h1 className="font-display text-4xl tracking-widest gradient-text">LARIOS</h1>
        <p className="text-muted-foreground mt-2">Paso {step} de 3</p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md space-y-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl tracking-wide mb-2">DATOS PERSONALES</h2>
                <p className="text-muted-foreground">Cuéntanos sobre ti</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Tu nombre *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="¿Cómo te llamas?"
                    className={`w-full h-14 px-4 bg-secondary border rounded-xl text-lg focus:outline-none transition-colors ${
                      errors.name ? 'border-destructive' : 'border-border focus:border-primary'
                    }`}
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary" />
                      Peso (kg) *
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => {
                        setFormData({ ...formData, weight: Number(e.target.value) });
                        if (errors.weight) setErrors({ ...errors, weight: '' });
                      }}
                      className={`w-full h-14 px-4 bg-secondary border rounded-xl text-lg text-center focus:outline-none transition-colors ${
                        errors.weight ? 'border-destructive' : 'border-border focus:border-primary'
                      }`}
                      min={30}
                      max={300}
                    />
                    {errors.weight && <p className="text-destructive text-xs mt-1">{errors.weight}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-primary" />
                      Altura (cm) *
                    </label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => {
                        setFormData({ ...formData, height: Number(e.target.value) });
                        if (errors.height) setErrors({ ...errors, height: '' });
                      }}
                      className={`w-full h-14 px-4 bg-secondary border rounded-xl text-lg text-center focus:outline-none transition-colors ${
                        errors.height ? 'border-destructive' : 'border-border focus:border-primary'
                      }`}
                      min={100}
                      max={250}
                    />
                    {errors.height && <p className="text-destructive text-xs mt-1">{errors.height}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md space-y-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Dumbbell className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl tracking-wide mb-2">TU DEPORTE</h2>
                <p className="text-muted-foreground">¿Qué tipo de entrenamiento te interesa?</p>
                {errors.sport && <p className="text-destructive text-sm mt-2">{errors.sport}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sports.map((sport) => (
                  <motion.button
                    key={sport.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setFormData({ ...formData, sport: sport.id });
                      if (errors.sport) setErrors({ ...errors, sport: '' });
                    }}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left relative ${
                      formData.sport === sport.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{sport.icon}</span>
                    <span className="font-medium">{sport.name}</span>
                    {formData.sport === sport.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-md space-y-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl tracking-wide mb-2">TU NIVEL</h2>
                <p className="text-muted-foreground">¿Cuánta experiencia tienes?</p>
              </div>

              <div className="space-y-3">
                {levels.map((level) => (
                  <motion.button
                    key={level.id}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setFormData({ ...formData, level: level.id })}
                    className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                      formData.level === level.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-lg">{level.name}</p>
                      <p className="text-sm text-muted-foreground">{level.description}</p>
                    </div>
                    {formData.level === level.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-md mx-auto flex gap-4">
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex-1 py-4 rounded-xl border border-border bg-secondary font-medium flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Atrás
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: canProceed() ? 1.02 : 1 }}
            whileTap={{ scale: canProceed() ? 0.98 : 1 }}
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground orange-glow'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {step === 3 ? (
              <>
                Comenzar
                <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
