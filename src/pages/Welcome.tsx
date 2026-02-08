import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Dumbbell, Play } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    // Si el usuario ya completó onboarding, ir directo al dashboard
    if (!isLoading && user?.hasCompletedOnboarding) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Si hay progreso guardado en sessionStorage, ir al onboarding
    const savedProgress = sessionStorage.getItem('larios_onboarding_progress');
    if (!isLoading && savedProgress && !user?.hasCompletedOnboarding) {
      navigate('/onboarding', { replace: true });
      return;
    }
  }, [isLoading, user, navigate]);

  // Video progress simulation
  useEffect(() => {
    if (!isLoading && !user?.hasCompletedOnboarding) {
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoEnded(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isLoading, user]);

  // Navigate after video ends
  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(() => {
        navigate('/onboarding', { replace: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [videoEnded, navigate]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      <AnimatePresence>
        {!videoEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* Video Background Simulation with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-larios-black to-background">
              {/* Animated gym elements */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
              />

              {/* Main content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block mb-8"
                  >
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center orange-glow">
                      <Dumbbell className="w-16 h-16 text-primary-foreground" />
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="font-display text-7xl md:text-8xl tracking-widest mb-4"
                  >
                    <span className="gradient-text">LARIOS</span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="text-xl text-muted-foreground tracking-wide mb-8"
                  >
                    Tu entrenamiento personalizado
                  </motion.p>

                  {/* Video simulation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="w-full max-w-md mx-auto"
                  >
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 overflow-hidden relative mb-4">
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
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      {videoProgress < 100 ? 'Preparando tu experiencia...' : '¡Listo!'}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade transition */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-background flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
