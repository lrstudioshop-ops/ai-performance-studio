import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, MessageCircle, Mail, FileText, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const helpOptions = [
  {
    icon: FileText,
    title: 'Centro de Ayuda',
    description: 'Consulta nuestra guía de preguntas frecuentes',
    action: () => toast.info('Centro de ayuda próximamente disponible'),
  },
  {
    icon: MessageCircle,
    title: 'Contactar Soporte',
    description: 'Envía un mensaje a nuestro equipo',
    action: () => toast.info('Soporte: soporte@larios.app'),
  },
  {
    icon: Mail,
    title: 'Enviar Feedback',
    description: 'Ayúdanos a mejorar con tu opinión',
    action: () => toast.success('¡Gracias! Tu feedback es importante para nosotros'),
  },
];

const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
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
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="font-display text-2xl tracking-wide">AYUDA</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {helpOptions.map((option, index) => (
                <motion.button
                  key={option.title}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={option.action}
                  className="w-full p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 transition-all text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <option.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{option.title}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground">
                ¿Necesitas ayuda urgente?
              </p>
              <p className="text-sm font-medium mt-1">
                Email: soporte@larios.app
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;
