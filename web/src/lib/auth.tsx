import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiFetch } from './api';

type Role = 'artisan' | 'client' | 'admin';

interface AuthState {
  token: string | null;
  role: Role | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  useEffect(() => {
    async function loadMe() {
      if (!token) return;
      try {
        const me = await apiFetch('/me');
        setRole(me.role as Role);
      } catch {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }
    loadMe();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', res.token);
    setToken(res.token);
    setRole(res.user.role as Role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };

  const value = useMemo(() => ({ token, role, loading, login, logout }), [token, role, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function RequireRole({ roles, children }: { roles: Role[]; children: React.ReactElement }) {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (!role) return <Navigate to="/login" replace />;
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return children;
} 