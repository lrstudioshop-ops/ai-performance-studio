import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Dumbbell, Trophy, Check, Save } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface TrainingPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sports = [
  { id: 'crossfit', name: 'Crossfit', icon: '🏋️' },
  { id: 'natacion', name: 'Natación', icon: '🏊' },
  { id: 'running', name: 'Running', icon: '🏃' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'yoga', name: 'Yoga', icon: '🧘' },
  { id: 'ciclismo', name: 'Ciclismo', icon: '🚴' },
];

const levels: { id: 'bajo' | 'intermedio' | 'elite' | 'profesional'; name: string }[] = [
  { id: 'bajo', name: 'Bajo' },
  { id: 'intermedio', name: 'Intermedio' },
  { id: 'elite', name: 'Élite' },
  { id: 'profesional', name: 'Profesional' },
];

const TrainingPreferencesModal = ({ isOpen, onClose }: TrainingPreferencesModalProps) => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    sport: user?.sport || '',
    level: user?.level || 'intermedio' as const,
  });

  const handleSave = () => {
    if (!formData.sport) {
      toast.error('Selecciona un deporte');
      return;
    }

    updateUser(formData);
    toast.success('Preferencias actualizadas correctamente');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-wide">PREFERENCIAS</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sport Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-primary" />
                Tu Deporte
              </label>
              <div className="grid grid-cols-2 gap-3">
                {sports.map((sport) => (
                  <motion.button
                    key={sport.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, sport: sport.id })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative ${
                      formData.sport === sport.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{sport.icon}</span>
                    <span className="font-medium text-sm">{sport.name}</span>
                    {formData.sport === sport.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Level Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-primary" />
                Tu Nivel
              </label>
              <div className="grid grid-cols-2 gap-3">
                {levels.map((level) => (
                  <motion.button
                    key={level.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, level: level.id })}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      formData.level === level.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-secondary/50 hover:border-primary/50'
                    }`}
                  >
                    <span className="font-medium">{level.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Guardar Cambios
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrainingPreferencesModal;
