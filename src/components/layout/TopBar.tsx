import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Moon, Sun, ChevronDown } from 'lucide-react';
import { currentAthlete, aiRecommendations } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const TopBar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = aiRecommendations.filter(r => r.priority === 'high').length;

  return (
    <header className="h-16 bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search */}
        <motion.div
          animate={{ width: searchFocused ? 400 : 320 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar ejercicios, planes, métricas..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={cn(
              'w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg',
              'text-sm placeholder:text-muted-foreground',
              'focus:outline-none focus:border-primary focus:bg-secondary transition-all duration-300',
              searchFocused && 'shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
            )}
          />
        </motion.div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-6 mr-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Próxima sesión</p>
              <p className="text-sm font-medium text-primary">Fuerza - Hoy 18:00</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Racha actual</p>
              <p className="text-sm font-medium text-accent">🔥 12 días</p>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-4 border-b border-border">
                  <h3 className="font-display font-semibold text-sm">Recomendaciones IA</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {aiRecommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full mt-2',
                            rec.priority === 'high' && 'bg-destructive',
                            rec.priority === 'medium' && 'bg-accent',
                            rec.priority === 'low' && 'bg-muted-foreground'
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{rec.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                          {rec.action && (
                            <button className="text-xs text-primary font-medium mt-2 hover:underline">
                              {rec.action} →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-2 pr-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
              {currentAthlete.name.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium">{currentAthlete.name}</p>
              <p className="text-xs text-muted-foreground">{currentAthlete.sport}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
