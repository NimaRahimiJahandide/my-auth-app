'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '../components';
import { useAuth } from '../hook/useAuth';
import { validateIranianPhoneNumber } from '../utils/validation';
import { ApiResponse } from '../types';
import styles from './auth.module.scss';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate
    if (!validateIranianPhoneNumber(phone)) {
      setError('لطفاً شماره موبایل معتبر وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user data from API
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data: ApiResponse = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Store user data and redirect
        login(data.results[0]);
        router.push('/dashboard');
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('خطا در ورود. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>ورود</h1>
          <p className={styles.subtitle}>
            برای ورود به سیستم شماره موبایل خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            id="phone"
            type="tel"
            label="شماره موبایل"
            placeholder="09123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={error}
            fullWidth
            required
            dir="ltr"
          />

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            size="large"
          >
            {isLoading ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            با ورود به سیستم، شما قوانین و مقررات را می‌پذیرید
          </p>
        </div>
      </div>
    </div>
  );
}