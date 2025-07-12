'use client';

import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuth = () => {
  return useAuthContext();
};

export const useProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
};