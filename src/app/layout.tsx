import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'Next.js Authentication Flow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}