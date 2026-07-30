import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { showToast } from '../utils/toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jtrack-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(user));

  useEffect(() => {
    setIsAuthenticated(Boolean(user));
    if (user) {
      localStorage.setItem('jtrack-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jtrack-user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    showToast.success('Logged Out Successfully', 'See you again soon!', { duration: 3200 });
  };

  const value = useMemo(() => ({ user, isAuthenticated, login, logout }), [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
