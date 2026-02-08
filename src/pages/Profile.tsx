import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { AthleteRadarChart } from '@/components/dashboard/Charts';
import { useUser, UserProfile } from '@/contexts/UserContext';
import {
  Target,
  Trophy,
  Calendar,
  Heart,
  Activity,
  Zap,
  Award,
  Edit,
  Camera,
  Save,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{
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

  if (!user) {
    navigate('/');
    return null;
  }

  const achievements = [
    { id: 1, name: 'Primera Sesión', icon: Trophy, earned: true },
    { id: 2, name: '10 Sesiones', icon: Award, earned: true },
    { id: 3, name: '50 Sesiones', icon: Award, earned: false },
    { id: 4, name: '100 Sesiones', icon: Trophy, earned: false },
    { id: 5, name: 'Racha 7 días', icon: Zap, earned: true },
    { id: 6, name: 'Racha 30 días', icon: Zap, earned: false },
  ];

  const stats = [
    { label: 'Sesiones Totales', value: '42', icon: Activity },
    { label: 'Horas Entrenadas', value: '63h', icon: Calendar },
    { label: 'Calorías Quemadas', value: '24,500', icon: Heart },
    { label: 'Racha Máxima', value: '12 días', icon: Zap },
  ];

  const handleSave = () => {
    updateUser({
      ...editForm,
    });
    setIsEditing(false);
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'bajo':
        return 'Bajo';
      case 'intermedio':
        return 'Intermedio';
      case 'elite':
        return 'Élite';
      case 'profesional':
        return 'Profesional';
      default:
        return level;
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-wide">
          <span className="gradient-text">MI PERFIL</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tu información y visualiza tu progreso
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-1/2 translate-x-8 translate-y-2 p-2 rounded-full bg-secondary border border-border hover:border-primary transition-colors"
            >
              <Camera className="h-4 w-4" />
            </motion.button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full h-10 px-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-secondary border border-border rounded-lg text-sm text-center focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Altura (cm)</label>
                  <input
                    type="number"
                    value={editForm.height}
                    onChange={(e) => setEditForm({ ...editForm, height: Number(e.target.value) })}
                    className="w-full h-10 px-3 bg-secondary border border-border rounded-lg text-sm text-center focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deporte</label>
                <select
                  value={editForm.sport}
                  onChange={(e) => setEditForm({ ...editForm, sport: e.target.value })}
                  className="w-full h-10 px-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="crossfit">Crossfit</option>
                  <option value="natacion">Natación</option>
                  <option value="running">Running</option>
                  <option value="fitness">Fitness</option>
                  <option value="yoga">Yoga</option>
                  <option value="ciclismo">Ciclismo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nivel</label>
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value as 'bajo' | 'intermedio' | 'elite' | 'profesional' })}
                  className="w-full h-10 px-3 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
                >
                  <option value="bajo">Bajo</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="elite">Élite</option>
                  <option value="profesional">Profesional</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 rounded-lg border border-border bg-secondary font-medium flex items-center justify-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="font-display text-2xl tracking-wide">{user.name.toUpperCase()}</h2>
                <p className="text-muted-foreground capitalize">{user.sport}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                  Nivel {getLevelLabel(user.level)}
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Peso', value: `${user.weight} kg` },
                  { label: 'Altura', value: `${user.height} cm` },
                  { label: 'Deporte', value: user.sport },
                  { label: 'Nivel', value: getLevelLabel(user.level) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium capitalize">{item.value}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="w-full mt-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Editar Perfil
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Stats & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + index * 0.05 }}
                className="glass rounded-xl p-4 text-center"
              >
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="font-display text-xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl tracking-wide">OBJETIVOS ACTIVOS</h3>
              <button className="text-sm text-primary hover:underline">Gestionar</button>
            </div>
            <div className="space-y-4">
              {['Ganar masa muscular', 'Mejorar resistencia', 'Perder grasa'].map((goal, index) => {
                const progress = 60 + index * 15;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{goal}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Radar Chart */}
        <AthleteRadarChart delay={0.3} />

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-xl tracking-wide mb-4">LOGROS</h3>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={cn(
                  'p-4 rounded-xl text-center transition-all duration-300',
                  achievement.earned
                    ? 'bg-accent/10 border border-accent/30'
                    : 'bg-secondary/30 border border-border opacity-50'
                )}
              >
                <achievement.icon
                  className={cn(
                    'h-8 w-8 mx-auto mb-2',
                    achievement.earned ? 'text-accent' : 'text-muted-foreground'
                  )}
                />
                <p className="text-xs font-medium">{achievement.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Profile;
