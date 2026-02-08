import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Eye, Share2, Database, Save } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('larios_privacy');
    return saved ? JSON.parse(saved) : {
      shareProgress: false,
      publicProfile: false,
      dataCollection: true,
    };
  });

  const handleSave = () => {
    localStorage.setItem('larios_privacy', JSON.stringify(settings));
    toast.success('Configuración de privacidad guardada');
    onClose();
  };

  const privacyOptions = [
    {
      key: 'shareProgress',
      icon: Share2,
      title: 'Compartir progreso',
      description: 'Permite que otros vean tu progreso de entrenamiento',
    },
    {
      key: 'publicProfile',
      icon: Eye,
      title: 'Perfil público',
      description: 'Tu perfil puede ser visible para otros usuarios',
    },
    {
      key: 'dataCollection',
      icon: Database,
      title: 'Recopilación de datos',
      description: 'Ayúdanos a mejorar compartiendo datos anónimos de uso',
    },
  ];

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
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl tracking-wide">PRIVACIDAD</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {privacyOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30"
                >
                  <div className="flex items-start gap-3">
                    <option.icon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{option.title}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setSettings((prev: Record<string, boolean>) => ({
                        ...prev,
                        [option.key]: !prev[option.key],
                      }))
                    }
                    className={cn(
                      'w-12 h-6 rounded-full transition-all duration-300 relative',
                      settings[option.key as keyof typeof settings]
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  >
                    <motion.div
                      animate={{
                        x: settings[option.key as keyof typeof settings] ? 24 : 2,
                      }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Guardar Configuración
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
