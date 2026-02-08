import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIRecommendation {
  id: string;
  type: 'training' | 'recovery' | 'warning';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
}

const aiRecommendations: AIRecommendation[] = [
  {
    id: 'ai1',
    type: 'training',
    priority: 'high',
    title: 'Aumentar volumen de piernas',
    description: 'Basado en tu progreso, puedes aumentar el volumen de entrenamiento de tren inferior en un 10% esta semana.',
  },
  {
    id: 'ai2',
    type: 'recovery',
    priority: 'medium',
    title: 'Sesión de movilidad recomendada',
    description: 'Detectamos rigidez en caderas. Se recomienda una sesión de 20 min de movilidad hoy.',
  },
  {
    id: 'ai3',
    type: 'warning',
    priority: 'low',
    title: 'Riesgo de sobreentrenamiento',
    description: 'Tu nivel de fatiga ha aumentado un 15% esta semana. Considera reducir la intensidad mañana.',
  },
];

const AIInsights = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'training':
        return TrendingUp;
      case 'recovery':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Sparkles;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="font-display text-lg tracking-wide">RECOMENDACIONES</h3>
      </div>

      <div className="space-y-3">
        {aiRecommendations.map((rec, index) => {
          const Icon = getIcon(rec.type);

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + index * 0.05 }}
              className={cn(
                'p-3 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02]',
                rec.type === 'training' && 'bg-primary/5 border-primary/30',
                rec.type === 'recovery' && 'bg-accent/5 border-accent/30',
                rec.type === 'warning' && 'bg-destructive/5 border-destructive/30'
              )}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={cn(
                    'h-4 w-4 mt-0.5 flex-shrink-0',
                    rec.type === 'training' && 'text-primary',
                    rec.type === 'recovery' && 'text-accent',
                    rec.type === 'warning' && 'text-destructive'
                  )}
                />
                <div>
                  <p className="text-sm font-medium">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {rec.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AIInsights;
