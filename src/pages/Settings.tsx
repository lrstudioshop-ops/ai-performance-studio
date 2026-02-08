import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { useUser } from '@/contexts/UserContext';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Scale,
  Ruler,
  Dumbbell,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import PersonalInfoModal from '@/components/settings/PersonalInfoModal';
import TrainingPreferencesModal from '@/components/settings/TrainingPreferencesModal';
import PrivacyModal from '@/components/settings/PrivacyModal';
import AppearanceModal from '@/components/settings/AppearanceModal';
import HelpModal from '@/components/settings/HelpModal';

type ModalType = 'personal' | 'privacy' | 'training' | 'appearance' | 'help' | null;

const Settings = () => {
  const { user, updateUser } = useUser();
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('larios_notifications');
    return saved ? JSON.parse(saved) : {
      training: true,
      reminders: true,
      weekly: false,
      tips: true,
    };
  });

  const handleNotificationChange = (key: string) => {
    const newSettings = { ...notifications, [key]: !notifications[key as keyof typeof notifications] };
    setNotifications(newSettings);
    localStorage.setItem('larios_notifications', JSON.stringify(newSettings));
    toast.success('Notificaciones actualizadas');
  };

  const settingsSections = [
    {
      title: 'Cuenta',
      items: [
        { 
          icon: User, 
          label: 'Información Personal', 
          description: 'Nombre, peso, altura',
          action: () => setActiveModal('personal'),
        },
        { 
          icon: Shield, 
          label: 'Privacidad', 
          description: 'Datos y permisos',
          action: () => setActiveModal('privacy'),
        },
      ],
    },
    {
      title: 'Preferencias de Entrenamiento',
      items: [
        { 
          icon: Dumbbell, 
          label: 'Deporte', 
          description: user?.sport || 'No definido',
          action: () => setActiveModal('training'),
        },
        { 
          icon: Trophy, 
          label: 'Nivel', 
          description: user?.level || 'Intermedio',
          action: () => setActiveModal('training'),
        },
        { 
          icon: Scale, 
          label: 'Peso', 
          description: `${user?.weight || 70} kg`,
          action: () => setActiveModal('personal'),
        },
        { 
          icon: Ruler, 
          label: 'Altura', 
          description: `${user?.height || 175} cm`,
          action: () => setActiveModal('personal'),
        },
      ],
    },
    {
      title: 'Preferencias',
      items: [
        { 
          icon: Palette, 
          label: 'Apariencia', 
          description: 'Tema oscuro',
          action: () => setActiveModal('appearance'),
        },
        { 
          icon: Globe, 
          label: 'Idioma', 
          description: 'Español (único)',
          action: () => toast.info('La aplicación solo está disponible en español'),
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('larios_user');
    localStorage.removeItem('larios_welcome_seen');
    localStorage.removeItem('larios_notifications');
    localStorage.removeItem('larios_privacy');
    toast.success('Sesión cerrada correctamente');
    window.location.href = '/';
  };

  return (
    <MainLayout>
      {/* Modals */}
      <PersonalInfoModal 
        isOpen={activeModal === 'personal'} 
        onClose={() => setActiveModal(null)} 
      />
      <TrainingPreferencesModal 
        isOpen={activeModal === 'training'} 
        onClose={() => setActiveModal(null)} 
      />
      <PrivacyModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
      />
      <AppearanceModal 
        isOpen={activeModal === 'appearance'} 
        onClose={() => setActiveModal(null)} 
      />
      <HelpModal 
        isOpen={activeModal === 'help'} 
        onClose={() => setActiveModal(null)} 
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-wide">
          <span className="gradient-text">AJUSTES</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Configura tu cuenta y preferencias
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + sectionIndex * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-display text-xl tracking-wide mb-4">{section.title.toUpperCase()}</h2>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.01, x: 4 }}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground capitalize">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-6 border-destructive/30"
          >
            <h2 className="font-display text-xl tracking-wide mb-4 text-destructive">
              ZONA DE PELIGRO
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <div className="text-left">
                    <p className="font-medium text-destructive">Cerrar Sesión</p>
                    <p className="text-sm text-muted-foreground">
                      Salir y borrar datos locales
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Notifications Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl tracking-wide">NOTIFICACIONES</h2>
            </div>
            <div className="space-y-4">
              {[
                { key: 'training', label: 'Recordatorios de entrenamiento', description: 'Alertas antes de cada sesión' },
                { key: 'reminders', label: 'Recordatorios diarios', description: 'Motivación para entrenar' },
                { key: 'weekly', label: 'Resumen semanal', description: 'Tu progreso de la semana' },
                { key: 'tips', label: 'Consejos del coach', description: 'Tips de entrenamiento' },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key)}
                    className={cn(
                      'w-12 h-6 rounded-full transition-all duration-300 relative',
                      notifications[item.key as keyof typeof notifications]
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  >
                    <motion.div
                      animate={{
                        x: notifications[item.key as keyof typeof notifications] ? 24 : 2,
                      }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display text-xl tracking-wide mb-4">TEMA</h3>
            <button
              onClick={() => setActiveModal('appearance')}
              className="w-full p-4 rounded-lg bg-secondary/50 border border-primary flex items-center gap-3 hover:bg-secondary transition-colors"
            >
              <Moon className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Modo Oscuro</p>
                <p className="text-xs text-muted-foreground">Activado</p>
              </div>
            </button>
          </motion.div>

          {/* Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h3 className="font-display text-xl tracking-wide">AYUDA</h3>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => setActiveModal('help')}
                className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors"
              >
                Centro de ayuda
              </button>
              <button 
                onClick={() => toast.info('Soporte: soporte@larios.app')}
                className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors"
              >
                Contactar soporte
              </button>
              <button 
                onClick={() => toast.success('¡Gracias por tu feedback!')}
                className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors"
              >
                Enviar feedback
              </button>
            </div>
          </motion.div>

          {/* App Version */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-display tracking-wide">LARIOS v1.0.0</p>
            <p className="text-xs mt-1">© 2024 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
