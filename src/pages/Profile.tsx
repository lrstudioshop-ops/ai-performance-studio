import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { currentAthlete, athleteRadarData, performanceHistory } from '@/lib/mock-data';
import { AthleteRadarChart } from '@/components/dashboard/Charts';
import {
  User,
  Target,
  Trophy,
  Calendar,
  TrendingUp,
  Heart,
  Activity,
  Zap,
  Award,
  Edit,
  Camera,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

const Profile = () => {
  const achievements = [
    { id: 1, name: 'Primera Sesión', icon: Trophy, earned: true },
    { id: 2, name: '10 Sesiones', icon: Award, earned: true },
    { id: 3, name: '50 Sesiones', icon: Award, earned: true },
    { id: 4, name: '100 Sesiones', icon: Trophy, earned: false },
    { id: 5, name: 'Racha 7 días', icon: Zap, earned: true },
    { id: 6, name: 'Racha 30 días', icon: Zap, earned: false },
  ];

  const stats = [
    { label: 'Sesiones Totales', value: '156', icon: Activity },
    { label: 'Horas Entrenadas', value: '234h', icon: Calendar },
    { label: 'Calorías Quemadas', value: '89,500', icon: Heart },
    { label: 'Racha Máxima', value: '21 días', icon: Zap },
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
          <span className="gradient-text">Mi Perfil</span>
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
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display font-bold text-primary-foreground">
              {currentAthlete.name.charAt(0)}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-1/2 translate-x-8 translate-y-2 p-2 rounded-full bg-secondary border border-border hover:border-primary transition-colors"
            >
              <Camera className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="text-center mb-6">
            <h2 className="font-display font-semibold text-xl">{currentAthlete.name}</h2>
            <p className="text-muted-foreground">{currentAthlete.sport}</p>
            <span
              className={cn(
                'inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium',
                currentAthlete.level === 'advanced' && 'bg-accent/20 text-accent',
                currentAthlete.level === 'elite' && 'bg-primary/20 text-primary'
              )}
            >
              Nivel {currentAthlete.level.charAt(0).toUpperCase() + currentAthlete.level.slice(1)}
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Edad', value: `${currentAthlete.age} años` },
              { label: 'Peso', value: `${currentAthlete.weight} kg` },
              { label: 'Altura', value: `${currentAthlete.height} cm` },
              { label: 'Miembro desde', value: new Date(currentAthlete.joinDate).toLocaleDateString('es') },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary font-medium flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"
          >
            <Edit className="h-4 w-4" />
            Editar Perfil
          </motion.button>
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
                <p className="font-display font-bold text-xl">{stat.value}</p>
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
              <h3 className="font-display font-semibold text-lg">Objetivos Activos</h3>
              <button className="text-sm text-primary hover:underline">Gestionar</button>
            </div>
            <div className="space-y-4">
              {currentAthlete.goals.map((goal, index) => {
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

          {/* VO2max Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-4">Evolución VO2max</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('es', { month: 'short' })}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[40, 60]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="vo2max"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                  name="VO2max"
                />
              </LineChart>
            </ResponsiveContainer>
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
          <h3 className="font-display font-semibold text-lg mb-4">Logros</h3>
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
