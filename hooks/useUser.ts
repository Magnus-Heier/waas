'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, getToken } from '@/lib/api';

export function useUser() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const refetch = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}

