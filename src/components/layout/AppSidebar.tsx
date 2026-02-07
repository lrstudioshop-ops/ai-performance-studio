import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Dumbbell,
  BarChart3,
  Calendar,
  User,
  Brain,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Library,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className="block">
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        )}
      >
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'neon-glow')} />
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-medium whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </NavLink>
  );
};

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const mainNavItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/training', icon: Dumbbell, label: 'Entrenamiento' },
    { to: '/exercises', icon: Library, label: 'Ejercicios' },
    { to: '/analytics', icon: BarChart3, label: 'Analítica' },
    { to: '/calendar', icon: Calendar, label: 'Calendario' },
    { to: '/ai-coach', icon: Brain, label: 'IA Coach' },
    { to: '/profile', icon: User, label: 'Perfil' },
  ];

  const bottomNavItems = [
    { to: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <motion.div
          className="flex items-center gap-3 overflow-hidden"
          animate={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-glow-pulse">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="font-display font-bold text-sm gradient-text">AI STUDIO</span>
                <span className="text-xs text-muted-foreground">Performance</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {mainNavItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed} />
        ))}
        
        <motion.button
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-300 w-full"
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Cerrar Sesión
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-secondary border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>
    </motion.aside>
  );
};

export default AppSidebar;
