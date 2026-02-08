import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MetricCard from '@/components/dashboard/MetricCard';
import TodaySessions from '@/components/dashboard/TodaySessions';
import AIInsights from '@/components/dashboard/AIInsights';
import {
  PerformanceChart,
  WeeklyActivityChart,
  AthleteRadarChart,
  IntensityTrendChart,
} from '@/components/dashboard/Charts';
import { weeklyStats } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import { Activity, Flame, Target, Zap, Heart, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const latestStats = weeklyStats[weeklyStats.length - 1];
  const previousStats = weeklyStats[weeklyStats.length - 2];

  useEffect(() => {
    if (!isLoading && (!user || !user.hasCompletedOnboarding)) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const calculateChange = (current: number, previous: number) =>
    Math.round(((current - previous) / previous) * 100);

  // Calculate personalized metrics based on user data
  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);
  const baseCalories = Math.round(user.weight * 7.5 * latestStats.sessions);

  return (
    <MainLayout>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-wide">
          HOLA, <span className="gradient-text">{user.name.toUpperCase()}</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Tu entrenamiento de hoy está listo. ¡A por ello!
        </p>
      </motion.div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <MetricCard
          title="IMC"
          value={bmi}
          unit=""
          icon={Heart}
          variant="primary"
          delay={0.1}
        />
        <MetricCard
          title="Sesiones Semana"
          value={latestStats.sessions}
          change={calculateChange(latestStats.sessions, previousStats.sessions)}
          icon={Activity}
          variant="accent"
          delay={0.15}
        />
        <MetricCard
          title="Calorías Quemadas"
          value={baseCalories.toLocaleString()}
          unit="kcal"
          change={calculateChange(latestStats.calories, previousStats.calories)}
          icon={Flame}
          variant="orange"
          delay={0.2}
        />
        <MetricCard
          title="Nivel de Fatiga"
          value={30}
          unit="%"
          change={-12}
          icon={Zap}
          variant="purple"
          delay={0.25}
        />
        <MetricCard
          title="Objetivo"
          value={75}
          unit="%"
          icon={Target}
          variant="pink"
          delay={0.3}
        />
        <MetricCard
          title="Intensidad Media"
          value={latestStats.avgIntensity}
          unit="%"
          change={calculateChange(latestStats.avgIntensity, previousStats.avgIntensity)}
          icon={TrendingUp}
          variant="primary"
          delay={0.35}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <PerformanceChart delay={0.4} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeeklyActivityChart delay={0.5} />
            <IntensityTrendChart delay={0.55} />
          </div>
        </div>

        {/* Right Column - Sessions & AI */}
        <div className="space-y-6">
          <TodaySessions />
          <AIInsights />
        </div>
      </div>

      {/* Athlete Radar */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AthleteRadarChart delay={0.6} />
        
        {/* Goals Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="lg:col-span-2 glass rounded-xl p-6"
        >
          <h3 className="font-display text-xl tracking-wide mb-4">OBJETIVOS ACTIVOS</h3>
          <div className="space-y-4">
            {['Ganar masa muscular', 'Mejorar resistencia', 'Perder grasa'].map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal}</span>
                  <span className="text-xs text-muted-foreground">
                    {60 + index * 15}% completado
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + index * 15}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
