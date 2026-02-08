import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  sport: string;
  level: 'bajo' | 'intermedio' | 'elite' | 'profesional';
  hasCompletedOnboarding: boolean;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo cargar datos desde localStorage (persistencia real)
    const savedUser = localStorage.getItem('larios_user');
    
    if (savedUser) {
      try {
        setUserState(JSON.parse(savedUser));
      } catch {
        // Si hay error parseando, limpiar
        localStorage.removeItem('larios_user');
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = (newUser: UserProfile) => {
    setUserState(newUser);
    // Solo guardar en localStorage cuando se completa el onboarding
    if (newUser.hasCompletedOnboarding) {
      localStorage.setItem('larios_user', JSON.stringify(newUser));
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUserState(updatedUser);
      // Actualizar localStorage si ya completó onboarding
      if (updatedUser.hasCompletedOnboarding) {
        localStorage.setItem('larios_user', JSON.stringify(updatedUser));
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
