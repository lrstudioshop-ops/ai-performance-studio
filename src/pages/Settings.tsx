import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
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
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    training: true,
    ai: true,
    weekly: false,
    marketing: false,
  });

  const settingsSections = [
    {
      title: 'Cuenta',
      items: [
        { icon: User, label: 'Información Personal', description: 'Nombre, email, teléfono' },
        { icon: Lock, label: 'Seguridad', description: 'Contraseña, 2FA' },
        { icon: Shield, label: 'Privacidad', description: 'Datos y permisos' },
      ],
    },
    {
      title: 'Preferencias',
      items: [
        { icon: Palette, label: 'Apariencia', description: 'Tema y personalización' },
        { icon: Globe, label: 'Idioma y Región', description: 'Español (ES)' },
        { icon: Smartphone, label: 'Dispositivos', description: '2 dispositivos conectados' },
      ],
    },
    {
      title: 'Datos',
      items: [
        { icon: Database, label: 'Exportar Datos', description: 'Descargar historial completo' },
        { icon: Eye, label: 'Integraciones', description: 'Conectar apps externas' },
      ],
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-3xl font-bold">
          <span className="gradient-text">Ajustes</span>
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
              <h2 className="font-display font-semibold text-lg mb-4">{section.title}</h2>
              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <motion.button
                    key={item.label}
                    whileHover={{ scale: 1.01, x: 4 }}
                    className="w-full flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
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
            <h2 className="font-display font-semibold text-lg mb-4 text-destructive">
              Zona de Peligro
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-colors">
                <div className="flex items-center gap-4">
                  <LogOut className="h-5 w-5 text-destructive" />
                  <div className="text-left">
                    <p className="font-medium text-destructive">Cerrar Sesión</p>
                    <p className="text-sm text-muted-foreground">
                      Salir de todos los dispositivos
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
              <h2 className="font-display font-semibold text-lg">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              {[
                { key: 'training', label: 'Recordatorios de entrenamiento', description: 'Alertas antes de cada sesión' },
                { key: 'ai', label: 'Insights de IA', description: 'Recomendaciones personalizadas' },
                { key: 'weekly', label: 'Resumen semanal', description: 'Email con tu progreso' },
                { key: 'marketing', label: 'Novedades y ofertas', description: 'Promociones y updates' },
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
                    onClick={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: !prev[item.key as keyof typeof prev],
                      }))
                    }
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

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Tema</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 rounded-lg bg-secondary/50 border border-primary flex flex-col items-center gap-2">
                <Moon className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Oscuro</span>
              </button>
              <button className="p-4 rounded-lg bg-secondary/30 border border-border flex flex-col items-center gap-2 opacity-50">
                <Sun className="h-6 w-6" />
                <span className="text-sm font-medium">Claro</span>
              </button>
            </div>
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
              <h3 className="font-display font-semibold text-lg">Ayuda</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors">
                Centro de ayuda
              </button>
              <button className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors">
                Contactar soporte
              </button>
              <button className="w-full p-3 rounded-lg bg-secondary/30 text-left text-sm hover:bg-secondary/50 transition-colors">
                Enviar feedback
              </button>
            </div>
          </motion.div>

          {/* App Version */}
          <div className="text-center text-sm text-muted-foreground">
            <p>AI Studio Performance v2.1.0</p>
            <p className="text-xs mt-1">© 2024 Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
