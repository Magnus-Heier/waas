'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getToken, type LoginCredentials, type SignupCredentials } from '@/lib/api';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = useCallback(async (credentials: LoginCredentials, redirectTo: string = '/dashboard') => {
    setLoading(true);
    setError(null);
    try {
      await apiLogin(credentials);
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await apiSignup(credentials);
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    apiLogout();
    router.push('/login');
    router.refresh();
  }, [router]);

  const isAuthenticated = useCallback(() => {
    return !!getToken();
  }, []);

  return {
    login,
    signup,
    logout,
    isAuthenticated,
    loading,
    error,
  };
}

