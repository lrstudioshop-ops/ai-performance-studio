import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import { performanceHistory, weeklyStats, athleteRadarData } from '@/lib/mock-data';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}

const ChartCard = ({ title, subtitle, children, delay = 0 }: ChartCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass rounded-xl p-6"
  >
    <div className="mb-6">
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
    {children}
  </motion.div>
);

export const PerformanceChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard title="Evolución del Rendimiento" subtitle="Últimos 7 meses" delay={delay}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={performanceHistory}>
          <defs>
            <linearGradient id="colorVo2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString('es', { month: 'short' })}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Area
            type="monotone"
            dataKey="vo2max"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorVo2)"
            strokeWidth={2}
            name="VO2max"
          />
          <Area
            type="monotone"
            dataKey="strength"
            stroke="hsl(var(--accent))"
            fillOpacity={1}
            fill="url(#colorStrength)"
            strokeWidth={2}
            name="Fuerza"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const WeeklyActivityChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard title="Actividad Semanal" subtitle="Sesiones y calorías" delay={delay}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyStats}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Bar
            dataKey="sessions"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            name="Sesiones"
          />
          <Bar
            dataKey="avgIntensity"
            fill="hsl(var(--accent))"
            radius={[4, 4, 0, 0]}
            name="Intensidad (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const AthleteRadarChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard title="Perfil de Rendimiento" subtitle="Habilidades actuales" delay={delay}>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={athleteRadarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="attribute"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
          />
          <Radar
            name="Nivel"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const IntensityTrendChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard title="Tendencia de Intensidad" subtitle="Últimas 6 semanas" delay={delay}>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={weeklyStats}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[60, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="avgIntensity"
            stroke="hsl(var(--neon-purple))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--neon-purple))', strokeWidth: 0 }}
            name="Intensidad (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
