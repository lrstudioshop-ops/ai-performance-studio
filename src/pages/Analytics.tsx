import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import {
  PerformanceChart,
  WeeklyActivityChart,
  AthleteRadarChart,
} from '@/components/dashboard/Charts';
import { weeklyStats } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Flame, Zap, Filter } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Analytics = () => {
  const { user } = useUser();
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'year'>('month');

  // Training distribution data
  const trainingDistribution = [
    { name: 'Fuerza', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Resistencia', value: 25, color: 'hsl(var(--accent))' },
    { name: 'Potencia', value: 20, color: 'hsl(25 95% 45%)' },
    { name: 'Velocidad', value: 12, color: 'hsl(35 100% 50%)' },
    { name: 'Movilidad', value: 8, color: 'hsl(0 0% 50%)' },
  ];

  // Weekly volume data
  const volumeData = weeklyStats.map((w) => ({
    week: w.week,
    volumen: w.sessions * w.duration * (w.avgIntensity / 100),
  }));

  // Calculate personalized calories based on user weight
  const baseCalories = user ? Math.round(user.weight * 7.5) : 500;

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-4xl tracking-wide">
            <span className="gradient-text">ANALÍTICA</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Análisis detallado de tu rendimiento y progreso
          </p>
        </div>
        
        {/* Time Filter */}
        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
          {(['week', 'month', 'year'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                timeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {filter === 'week' ? 'Semana' : filter === 'month' ? 'Mes' : 'Año'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: 'Volumen Total',
            value: '12,450',
            unit: 'kg',
            change: 15,
            icon: Activity,
          },
          {
            title: 'Carga Semanal',
            value: '2,890',
            unit: 'AU',
            change: 8,
            icon: Target,
          },
          {
            title: 'Calorías Mes',
            value: (baseCalories * 30).toLocaleString(),
            unit: 'kcal',
            change: 12,
            icon: Flame,
          },
          {
            title: 'Índice Forma',
            value: '87',
            unit: '%',
            change: -3,
            icon: Zap,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/20 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.change >= 0 ? 'text-accent' : 'text-destructive'
                }`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-display text-2xl">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.unit}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PerformanceChart delay={0.2} />
        </div>
        <AthleteRadarChart delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <WeeklyActivityChart delay={0.3} />

        {/* Training Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-xl tracking-wide mb-2">DISTRIBUCIÓN DE ENTRENAMIENTO</h3>
          <p className="text-sm text-muted-foreground mb-4">Por tipo de ejercicio</p>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={trainingDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {trainingDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {trainingDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm flex-1">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Volume Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="font-display text-xl tracking-wide mb-2">VOLUMEN DE ENTRENAMIENTO</h3>
        <p className="text-sm text-muted-foreground mb-4">Carga total semanal (unidades arbitrarias)</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={volumeData}>
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="volumen"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorVolume)"
              strokeWidth={2}
              name="Volumen"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </MainLayout>
  );
};

export default Analytics;
