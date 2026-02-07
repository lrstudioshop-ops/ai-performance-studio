import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  icon: LucideIcon;
  variant?: 'primary' | 'accent' | 'purple' | 'orange' | 'pink';
  delay?: number;
}

const MetricCard = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  variant = 'primary',
  delay = 0,
}: MetricCardProps) => {
  const variantStyles = {
    primary: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50',
    accent: 'from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50',
    purple: 'from-neon-purple/20 to-neon-purple/5 border-neon-purple/30 hover:border-neon-purple/50',
    orange: 'from-neon-orange/20 to-neon-orange/5 border-neon-orange/30 hover:border-neon-orange/50',
    pink: 'from-neon-pink/20 to-neon-pink/5 border-neon-pink/30 hover:border-neon-pink/50',
  };

  const iconColors = {
    primary: 'text-primary',
    accent: 'text-accent',
    purple: 'text-neon-purple',
    orange: 'text-neon-orange',
    pink: 'text-neon-pink',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={cn(
        'relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm transition-all duration-300',
        variantStyles[variant]
      )}
    >
      {/* Background glow effect */}
      <div className={cn(
        'absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl opacity-30',
        variant === 'primary' && 'bg-primary',
        variant === 'accent' && 'bg-accent',
        variant === 'purple' && 'bg-neon-purple',
        variant === 'orange' && 'bg-neon-orange',
        variant === 'pink' && 'bg-neon-pink'
      )} />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-display font-bold">{value}</span>
              {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
            </div>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    change >= 0 ? 'text-accent' : 'text-destructive'
                  )}
                >
                  {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
                <span className="text-xs text-muted-foreground">vs semana anterior</span>
              </div>
            )}
          </div>
          <div className={cn(
            'p-3 rounded-lg bg-background/50 backdrop-blur-sm',
            iconColors[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
