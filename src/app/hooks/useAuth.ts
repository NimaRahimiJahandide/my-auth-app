'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/contexts';
import { ROUTES } from '@/constants';

export const useAuth = () => {
  return useAuthContext();
};

export const useProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(ROUTES.AUTH);
    }
  }, [user, isLoading, router]);

  return { user, isLoading };
};