import { User } from '@/types';

export interface ApiResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
}