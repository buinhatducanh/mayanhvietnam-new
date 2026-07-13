'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  name: string;
  phone: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user_logged_in');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  const login = (u: User) => {
    localStorage.setItem('user_logged_in', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('user_logged_in');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
