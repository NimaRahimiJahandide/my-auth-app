'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import { useProtectedRoute, useAuth } from '@/hooks';
import { ROUTES } from '@/constants';
import styles from './index.module.scss';

export default function DashboardPage() {
  const { user, isLoading } = useProtectedRoute();
  const { logout } = useAuth();
  const router = useRouter();
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.AUTH);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingSpinner} />
      </div>
    );
  }

  // Show nothing if no user (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              <img 
                src={user.picture.large} 
                alt={`${user.name.first} ${user.name.last}`}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.userDetails}>
              <h1 className={styles.welcomeMessage}>
                Welcome to the Dashboard
              </h1>
              <p className={styles.userGreeting}>
                Hello, {user.name.first} {user.name.last}
              </p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
          <Button
            ref={logoutButtonRef}
            variant="outline"
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        </header>

        <main className={styles.main}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>User Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Name:</label>
                <span>{user.name.title} {user.name.first} {user.name.last}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Phone:</label>
                <span>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Location:</label>
                <span>{user.location.city}, {user.location.state}</span>
              </div>
              <div className={styles.infoItem}>
                <label>Age:</label>
                <span>{user.dob.age} years old</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}