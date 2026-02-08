import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Scale, Ruler, Save } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalInfoModal = ({ isOpen, onClose }: PersonalInfoModalProps) => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    weight: user?.weight || 70,
    height: user?.height || 175,
  });

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('El nombre es obligatorio');
      return;
    }
    if (formData.weight < 30 || formData.weight > 300) {
      toast.error('Introduce un peso válido (30-300 kg)');
      return;
    }
    if (formData.height < 100 || formData.height > 250) {
      toast.error('Introduce una altura válida (100-250 cm)');
      return;
    }

    updateUser(formData);
    toast.success('Información actualizada correctamente');
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
              <h2 className="font-display text-2xl tracking-wide">INFORMACIÓN PERSONAL</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 bg-secondary border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-primary" />
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-secondary border border-border rounded-xl text-center focus:outline-none focus:border-primary transition-colors"
                    min={30}
                    max={300}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full h-12 px-4 bg-secondary border border-border rounded-xl text-center focus:outline-none focus:border-primary transition-colors"
                    min={100}
                    max={250}
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2"
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

export default PersonalInfoModal;
