'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { STORAGE_KEYS, ROUTES } from '@/constants';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (user) {
      router.replace(ROUTES.DASHBOARD);
    } else {
      router.replace(ROUTES.AUTH);
    }
  }, [router]);

  return <p style={{ textAlign: 'center', marginTop: '2rem' }}>لودینگ ...</p>;
}