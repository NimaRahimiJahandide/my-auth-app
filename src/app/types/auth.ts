import { User } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginCredentials {
  phone: string;
}