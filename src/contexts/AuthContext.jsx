import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../services/jantrackApi';
import { showToast } from '../utils/toast';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(Boolean(user));
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('jtrack-token');
    if (!token) return;

    getCurrentUser()
      .then(({ data }) => setUser(data.user))
      .catch((error) => {
        // If backend is unreachable, inform user explicitly
        if (!error.response) {
          showToast.error('Server Unavailable', 'Cannot reach JanTrack backend. Some features may not work.');
        }
        localStorage.removeItem('jtrack-token');
        setUser(null);
      });
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('jtrack-token');
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
