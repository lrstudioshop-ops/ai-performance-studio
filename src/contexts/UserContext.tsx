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
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (value: boolean) => void;
}

const defaultUser: UserProfile = {
  name: '',
  weight: 70,
  height: 175,
  sport: '',
  level: 'intermedio',
  hasCompletedOnboarding: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('larios_user');
    const welcomeSeen = localStorage.getItem('larios_welcome_seen');
    
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
    }
    if (welcomeSeen) {
      setHasSeenWelcome(true);
    }
    setIsLoading(false);
  }, []);

  const setUser = (newUser: UserProfile) => {
    setUserState(newUser);
    localStorage.setItem('larios_user', JSON.stringify(newUser));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    }
  };

  const handleSetHasSeenWelcome = (value: boolean) => {
    setHasSeenWelcome(value);
    if (value) {
      localStorage.setItem('larios_welcome_seen', 'true');
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        isLoading,
        hasSeenWelcome,
        setHasSeenWelcome: handleSetHasSeenWelcome,
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
