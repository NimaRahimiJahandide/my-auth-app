'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';
import { validateIranianPhoneNumber } from '@/utils';
import { fetchUser } from '@/services';
import { ROUTES } from '@/constants';
import styles from './index.module.scss';

export default function AuthPage() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [user, router]);

  // Focus on phone input when component mounts
  useEffect(() => {
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (!validateIranianPhoneNumber(phone)) {
      setError('لطفاً شماره موبایل معتبر وارد کنید');
      return;
    }

    setIsLoading(true);

    try {
      const userData = await fetchUser();
      login(userData);
      router.push(ROUTES.DASHBOARD);
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
            ref={phoneInputRef}
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
            helperText="نمونه: 09123456789"
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