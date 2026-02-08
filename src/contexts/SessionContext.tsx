import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Exercise } from '@/lib/mock-data';

interface SessionExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  weight?: number;
  addedAt: Date;
}

interface SessionContextType {
  sessionExercises: SessionExercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  clearSession: () => void;
  updateExercise: (exerciseId: string, updates: Partial<SessionExercise>) => void;
  totalExercises: number;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionExercises, setSessionExercises] = useState<SessionExercise[]>([]);

  const addExercise = (exercise: Exercise) => {
    // Check if already in session
    if (sessionExercises.some(e => e.exercise.id === exercise.id)) {
      return;
    }
    
    const newExercise: SessionExercise = {
      exercise,
      sets: 3,
      reps: 12,
      weight: undefined,
      addedAt: new Date(),
    };
    
    setSessionExercises(prev => [...prev, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setSessionExercises(prev => prev.filter(e => e.exercise.id !== exerciseId));
  };

  const clearSession = () => {
    setSessionExercises([]);
  };

  const updateExercise = (exerciseId: string, updates: Partial<SessionExercise>) => {
    setSessionExercises(prev =>
      prev.map(e =>
        e.exercise.id === exerciseId ? { ...e, ...updates } : e
      )
    );
  };

  return (
    <SessionContext.Provider
      value={{
        sessionExercises,
        addExercise,
        removeExercise,
        clearSession,
        updateExercise,
        totalExercises: sessionExercises.length,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
