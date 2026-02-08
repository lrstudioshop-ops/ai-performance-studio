import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { exercises, trainingTypes, exercisesBySport } from '@/lib/mock-data';
import { useUser } from '@/contexts/UserContext';
import { Search, Dumbbell, Clock, Flame, X, Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Exercises = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  // Get exercises based on user's sport
  const userSportExercises = user?.sport ? exercisesBySport[user.sport] || [] : [];
  const allExercises = [...userSportExercises, ...exercises];
  
  // Remove duplicates by id
  const uniqueExercises = allExercises.filter(
    (ex, index, self) => index === self.findIndex((e) => e.id === ex.id)
  );

  const filteredExercises = uniqueExercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? ex.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const exercise = uniqueExercises.find((e) => e.id === selectedExercise);

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Medio';
      case 'dificil':
        return 'Difícil';
      default:
        return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facil':
        return 'bg-accent/20 text-accent';
      case 'medio':
        return 'bg-primary/20 text-primary';
      case 'dificil':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-4xl tracking-wide">
          <span className="gradient-text">EJERCICIOS</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Explora ejercicios para {user?.sport || 'tu deporte'}
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar ejercicios..."
            className="w-full h-12 pl-10 pr-4 bg-secondary/50 border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            Todos
          </button>
          {trainingTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                selectedCategory === type.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {type.name}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exercise Grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExercises.map((ex, index) => {
              const type = trainingTypes.find((t) => t.id === ex.category);

              return (
                <motion.button
                  key={ex.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => setSelectedExercise(ex.id)}
                  className={cn(
                    'p-5 rounded-xl glass text-left transition-all duration-300 group',
                    selectedExercise === ex.id && 'border-primary ring-2 ring-primary/20'
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="p-3 rounded-lg transition-all group-hover:scale-110 bg-primary/20"
                    >
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getDifficultyColor(ex.difficulty))}>
                      {getDifficultyLabel(ex.difficulty)}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2">{ex.name}</h3>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {ex.duration}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {ex.calories} kcal
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ex.muscleGroups.slice(0, 3).map((muscle, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-background/50 rounded text-xs text-muted-foreground"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Exercise Detail */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {exercise ? (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-xl p-6 sticky top-24"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl tracking-wide">{exercise.name.toUpperCase()}</h2>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Image placeholder */}
                <div className="aspect-video bg-secondary rounded-xl mb-6 flex items-center justify-center border border-border">
                  <div className="text-center">
                    <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Imagen del ejercicio</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Duración</p>
                    <p className="font-display text-lg">{exercise.duration}s</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Calorías</p>
                    <p className="font-display text-lg">{exercise.calories}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Nivel</p>
                    <p className="font-display text-lg capitalize">
                      {getDifficultyLabel(exercise.difficulty)}
                    </p>
                  </div>
                </div>

                {/* Muscle Groups */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-3">Músculos Implicados</h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.muscleGroups.map((muscle, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-lg text-sm text-primary"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-3">Equipamiento</h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.equipment.length > 0 ? (
                      exercise.equipment.map((eq, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-secondary rounded-lg text-sm"
                        >
                          {eq}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Sin equipamiento</span>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Cómo realizarlo
                  </h3>
                  <ol className="space-y-2">
                    {exercise.instructions.map((instruction, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Añadir a Sesión
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-12 text-center sticky top-24"
              >
                <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-lg mb-2">SELECCIONA UN EJERCICIO</h3>
                <p className="text-muted-foreground text-sm">
                  Haz clic en cualquier ejercicio para ver sus detalles y técnica
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default Exercises;
