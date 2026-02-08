import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Dumbbell } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const { hasSeenWelcome, setHasSeenWelcome, user } = useUser();
  const [showContent, setShowContent] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (hasSeenWelcome) {
      if (user?.hasCompletedOnboarding) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
      return;
    }

    // Simulate video playing for 5 seconds
    const timer = setTimeout(() => {
      setVideoEnded(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasSeenWelcome, user, navigate]);

  useEffect(() => {
    if (videoEnded) {
      setTimeout(() => {
        setHasSeenWelcome(true);
        navigate('/onboarding');
      }, 1000);
    }
  }, [videoEnded, navigate, setHasSeenWelcome]);

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

              {/* Gym silhouettes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
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
                    transition={{ delay: 1, duration: 0.8 }}
                    className="font-display text-7xl md:text-8xl tracking-widest mb-4"
                  >
                    <span className="gradient-text">LARIOS</span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="text-xl text-muted-foreground tracking-wide"
                  >
                    Tu entrenamiento personalizado
                  </motion.p>

                  {/* Loading indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="mt-12 h-1 w-64 mx-auto bg-primary/30 rounded-full overflow-hidden origin-left"
                  >
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="h-full w-full bg-gradient-to-r from-primary to-accent"
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade to next screen */}
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
