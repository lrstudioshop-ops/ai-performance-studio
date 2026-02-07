import { motion } from 'framer-motion';
import { aiRecommendations } from '@/lib/mock-data';
import { Brain, TrendingUp, Moon, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  training: TrendingUp,
  recovery: Moon,
  nutrition: Brain,
  warning: AlertTriangle,
};

const colorMap = {
  training: 'text-primary bg-primary/10 border-primary/30',
  recovery: 'text-accent bg-accent/10 border-accent/30',
  nutrition: 'text-neon-purple bg-neon-purple/10 border-neon-purple/30',
  warning: 'text-neon-orange bg-neon-orange/10 border-neon-orange/30',
};

const AIInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg">Insights de IA</h3>
          <p className="text-sm text-muted-foreground">Recomendaciones personalizadas</p>
        </div>
      </div>

      <div className="space-y-4">
        {aiRecommendations.map((rec, index) => {
          const Icon = iconMap[rec.type];

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={cn(
                'p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]',
                colorMap[rec.type]
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        rec.priority === 'high' && 'bg-destructive/20 text-destructive',
                        rec.priority === 'medium' && 'bg-accent/20 text-accent',
                        rec.priority === 'low' && 'bg-muted text-muted-foreground'
                      )}
                    >
                      {rec.priority === 'high'
                        ? 'Prioritario'
                        : rec.priority === 'medium'
                        ? 'Sugerido'
                        : 'Info'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  {rec.action && (
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:underline"
                    >
                      {rec.action}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 via-accent/10 to-neon-purple/10 border border-primary/20">
        <p className="text-sm text-center">
          <span className="text-muted-foreground">Motor de IA analizando </span>
          <span className="font-medium text-primary">147 métricas</span>
          <span className="text-muted-foreground"> de tu rendimiento</span>
        </p>
      </div>
    </motion.div>
  );
};

export default AIInsights;
