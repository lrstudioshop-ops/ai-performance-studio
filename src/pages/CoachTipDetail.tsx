import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { coachTips } from '@/lib/mock-data';
import {
  ArrowLeft,
  Apple,
  Dumbbell,
  Heart,
  Flame,
  Clock,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categoryIcons = {
  nutricion: Apple,
  entrenamiento: Dumbbell,
  recuperacion: Heart,
  motivacion: Flame,
};

const categoryColors = {
  nutricion: 'bg-green-500/20 text-green-400 border-green-500/30',
  entrenamiento: 'bg-primary/20 text-primary border-primary/30',
  recuperacion: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  motivacion: 'bg-accent/20 text-accent border-accent/30',
};

const categoryImages = {
  nutricion: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop',
  entrenamiento: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
  recuperacion: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop',
  motivacion: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=400&fit=crop',
};

const detailedContent: Record<string, { steps: string[]; benefits: string[]; duration: string }> = {
  '1': {
    steps: [
      'Calcula tu gasto calórico basal usando la fórmula de Harris-Benedict',
      'Añade un 10-20% extra para el efecto térmico de los alimentos',
      'Suma las calorías de tu actividad física diaria',
      'Ajusta según tu objetivo: déficit para perder grasa, superávit para ganar músculo',
    ],
    benefits: ['Control del peso corporal', 'Mejor rendimiento deportivo', 'Composición corporal óptima'],
    duration: '5-10 min diarios',
  },
  '2': {
    steps: [
      'Realiza 5-10 minutos de cardio ligero para aumentar la temperatura corporal',
      'Incluye movilidad articular de todas las articulaciones principales',
      'Añade estiramientos dinámicos específicos para los músculos que trabajarás',
      'Realiza series de aproximación con peso ligero antes de las series de trabajo',
    ],
    benefits: ['Prevención de lesiones', 'Mayor rango de movimiento', 'Mejor activación muscular'],
    duration: '10-15 min',
  },
  '3': {
    steps: [
      'Duerme 7-9 horas por noche para optimizar la recuperación hormonal',
      'Mantén un horario de sueño consistente, incluso los fines de semana',
      'Evita pantallas y estimulantes 2 horas antes de dormir',
      'Crea un ambiente oscuro, fresco y silencioso para dormir',
    ],
    benefits: ['Recuperación muscular acelerada', 'Mejor síntesis proteica', 'Regulación hormonal óptima'],
    duration: '7-9 horas',
  },
  '4': {
    steps: [
      'Define objetivos SMART: Específicos, Medibles, Alcanzables, Relevantes y con Tiempo',
      'Divide tus metas grandes en pequeños hitos semanales',
      'Lleva un diario de entrenamiento para trackear tu progreso',
      'Celebra cada pequeña victoria para mantener la motivación',
    ],
    benefits: ['Mayor adherencia al programa', 'Sensación de logro constante', 'Progreso medible y visible'],
    duration: '15 min semanales',
  },
};

const CoachTipDetail = () => {
  const { tipId } = useParams<{ tipId: string }>();
  const navigate = useNavigate();
  
  const tip = coachTips.find((t) => t.id === tipId);
  const content = tipId ? detailedContent[tipId] : null;
  
  if (!tip) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-xl text-muted-foreground mb-4">Consejo no encontrado</p>
          <button
            onClick={() => navigate('/coach')}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            Volver al Coach
          </button>
        </div>
      </MainLayout>
    );
  }

  const Icon = categoryIcons[tip.category];
  const colorClass = categoryColors[tip.category];
  const imageUrl = categoryImages[tip.category];

  return (
    <MainLayout>
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/coach')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Volver al Coach</span>
      </motion.button>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 rounded-2xl overflow-hidden mb-8"
      >
        <img
          src={imageUrl}
          alt={tip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-3', colorClass)}>
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium capitalize">{tip.category}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl tracking-wide">{tip.title}</h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <h2 className="font-display text-xl tracking-wide mb-4">DESCRIPCIÓN</h2>
            <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Este consejo está diseñado para ayudarte a optimizar tu rendimiento deportivo y alcanzar tus objetivos de manera más eficiente. Siguiendo estas recomendaciones de manera consistente, notarás mejoras significativas en tu progreso.
            </p>
          </motion.div>

          {/* Steps */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-display text-xl tracking-wide mb-4">CÓMO APLICARLO</h2>
              <div className="space-y-4">
                {content.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Duration */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg tracking-wide">TIEMPO ESTIMADO</h3>
              </div>
              <p className="text-2xl font-semibold gradient-text">{content.duration}</p>
            </motion.div>
          )}

          {/* Benefits */}
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg tracking-wide">BENEFICIOS</h3>
              </div>
              <div className="space-y-3">
                {content.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Pro Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Consejo Pro</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              La consistencia es más importante que la perfección. Empieza poco a poco e incrementa gradualmente para crear hábitos duraderos.
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CoachTipDetail;
