'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token here
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await auth.login(email, password);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const data = await auth.signup(email, password);
      localStorage.setItem('token', data.token);
      setUser({ token: data.token });
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 