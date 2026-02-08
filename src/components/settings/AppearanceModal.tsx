import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Moon, Sun, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themes = [
  { id: 'dark', name: 'Modo Oscuro', icon: Moon, description: 'Tema oscuro por defecto' },
  { id: 'light', name: 'Modo Claro', icon: Sun, description: 'Próximamente disponible', disabled: true },
];

const AppearanceModal = ({ isOpen, onClose }: AppearanceModalProps) => {
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const handleSave = () => {
    localStorage.setItem('larios_theme', selectedTheme);
    toast.success('Tema actualizado');
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
            className="glass rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl tracking-wide">APARIENCIA</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: theme.disabled ? 1 : 1.02 }}
                  whileTap={{ scale: theme.disabled ? 1 : 0.98 }}
                  onClick={() => !theme.disabled && setSelectedTheme(theme.id)}
                  disabled={theme.disabled}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                    selectedTheme === theme.id
                      ? 'border-primary bg-primary/10'
                      : theme.disabled
                      ? 'border-border bg-secondary/30 opacity-50 cursor-not-allowed'
                      : 'border-border bg-secondary/50 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <theme.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-xs text-muted-foreground">{theme.description}</p>
                    </div>
                  </div>
                  {selectedTheme === theme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold"
            >
              Aplicar Tema
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppearanceModal;
