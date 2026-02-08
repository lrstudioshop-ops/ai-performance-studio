import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import {
  PerformanceChart,
  WeeklyActivityChart,
  AthleteRadarChart,
} from '@/components/dashboard/Charts';
import { weeklyStats, performanceHistory } from '@/lib/mock-data';
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
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Flame, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

type TimeFilter = 'week' | 'month' | 'year';

const Analytics = () => {
  const { user } = useUser();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('month');

  // Generate data based on time filter
  const getFilteredData = useMemo(() => {
    switch (timeFilter) {
      case 'week':
        return {
          stats: weeklyStats.slice(-1), // Last week
          volumeData: weeklyStats.slice(-1).map((w) => ({
            week: w.week,
            volumen: w.sessions * w.duration * (w.avgIntensity / 100),
          })),
          multiplier: 1,
          periodLabel: 'esta semana',
          distribution: [
            { name: 'Fuerza', value: 40, color: 'hsl(var(--primary))' },
            { name: 'Resistencia', value: 30, color: 'hsl(var(--accent))' },
            { name: 'Potencia', value: 15, color: 'hsl(25 95% 45%)' },
            { name: 'Velocidad', value: 10, color: 'hsl(35 100% 50%)' },
            { name: 'Movilidad', value: 5, color: 'hsl(0 0% 50%)' },
          ],
        };
      case 'month':
        return {
          stats: weeklyStats.slice(-4), // Last 4 weeks
          volumeData: weeklyStats.slice(-4).map((w) => ({
            week: w.week,
            volumen: w.sessions * w.duration * (w.avgIntensity / 100),
          })),
          multiplier: 4,
          periodLabel: 'este mes',
          distribution: [
            { name: 'Fuerza', value: 35, color: 'hsl(var(--primary))' },
            { name: 'Resistencia', value: 25, color: 'hsl(var(--accent))' },
            { name: 'Potencia', value: 20, color: 'hsl(25 95% 45%)' },
            { name: 'Velocidad', value: 12, color: 'hsl(35 100% 50%)' },
            { name: 'Movilidad', value: 8, color: 'hsl(0 0% 50%)' },
          ],
        };
      case 'year':
        return {
          stats: weeklyStats, // All weeks (representing year data)
          volumeData: performanceHistory.map((p) => ({
            week: new Date(p.date).toLocaleDateString('es', { month: 'short' }),
            volumen: (p.strength + p.endurance + p.power) * 2,
          })),
          multiplier: 52,
          periodLabel: 'este año',
          distribution: [
            { name: 'Fuerza', value: 32, color: 'hsl(var(--primary))' },
            { name: 'Resistencia', value: 28, color: 'hsl(var(--accent))' },
            { name: 'Potencia', value: 18, color: 'hsl(25 95% 45%)' },
            { name: 'Velocidad', value: 14, color: 'hsl(35 100% 50%)' },
            { name: 'Movilidad', value: 8, color: 'hsl(0 0% 50%)' },
          ],
        };
      default:
        return {
          stats: weeklyStats,
          volumeData: [],
          multiplier: 1,
          periodLabel: '',
          distribution: [],
        };
    }
  }, [timeFilter]);

  // Calculate stats based on filter
  const calculateStats = useMemo(() => {
    const baseData = getFilteredData.stats;
    const totalSessions = baseData.reduce((acc, w) => acc + w.sessions, 0);
    const totalCalories = baseData.reduce((acc, w) => acc + w.calories, 0);
    const avgIntensity = Math.round(baseData.reduce((acc, w) => acc + w.avgIntensity, 0) / baseData.length);
    
    const baseWeight = user?.weight || 75;
    const volumeMultiplier = timeFilter === 'week' ? 1 : timeFilter === 'month' ? 4 : 52;
    
    return {
      volume: Math.round(baseWeight * totalSessions * 15 * volumeMultiplier / (timeFilter === 'year' ? 4 : 1)),
      load: Math.round(totalSessions * avgIntensity * 3),
      calories: totalCalories,
      formIndex: avgIntensity + 10,
    };
  }, [getFilteredData, timeFilter, user]);

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
            Análisis detallado de tu rendimiento {getFilteredData.periodLabel}
          </p>
        </div>
        
        {/* Time Filter */}
        <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg">
          {(['week', 'month', 'year'] as const).map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTimeFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                timeFilter === filter
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {filter === 'week' ? 'Semana' : filter === 'month' ? 'Mes' : 'Año'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: 'Volumen Total',
            value: calculateStats.volume.toLocaleString(),
            unit: 'kg',
            change: timeFilter === 'week' ? 8 : timeFilter === 'month' ? 15 : 45,
            icon: Activity,
          },
          {
            title: 'Carga Semanal',
            value: calculateStats.load.toLocaleString(),
            unit: 'AU',
            change: timeFilter === 'week' ? 5 : timeFilter === 'month' ? 8 : 22,
            icon: Target,
          },
          {
            title: `Calorías ${timeFilter === 'week' ? 'Semana' : timeFilter === 'month' ? 'Mes' : 'Año'}`,
            value: calculateStats.calories.toLocaleString(),
            unit: 'kcal',
            change: timeFilter === 'week' ? 3 : timeFilter === 'month' ? 12 : 35,
            icon: Flame,
          },
          {
            title: 'Índice Forma',
            value: calculateStats.formIndex.toString(),
            unit: '%',
            change: timeFilter === 'week' ? -2 : timeFilter === 'month' ? -3 : 8,
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

        {/* Training Distribution - Updates based on filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-xl p-6"
        >
          <h3 className="font-display text-xl tracking-wide mb-2">DISTRIBUCIÓN DE ENTRENAMIENTO</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Por tipo de ejercicio ({timeFilter === 'week' ? 'última semana' : timeFilter === 'month' ? 'último mes' : 'último año'})
          </p>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={getFilteredData.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {getFilteredData.distribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {getFilteredData.distribution.map((item) => (
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

      {/* Volume Trend - Updates based on filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-xl p-6"
      >
        <h3 className="font-display text-xl tracking-wide mb-2">VOLUMEN DE ENTRENAMIENTO</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Carga total {timeFilter === 'week' ? 'diaria' : timeFilter === 'month' ? 'semanal' : 'mensual'} (unidades arbitrarias)
        </p>
        <ResponsiveContainer width="100%" height={250}>
          {timeFilter === 'year' ? (
            <BarChart data={getFilteredData.volumeData}>
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
              <Bar
                dataKey="volumen"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                name="Volumen"
              />
            </BarChart>
          ) : (
            <AreaChart data={getFilteredData.volumeData}>
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
          )}
        </ResponsiveContainer>
      </motion.div>
    </MainLayout>
  );
};

export default Analytics;
