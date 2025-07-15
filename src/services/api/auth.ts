import { usersApi, CancelableRequest } from '@/services/api';
import { User } from '@/types';

export const fetchUser = (): CancelableRequest<User> => {
  return usersApi.fetchUser();
};

// Additional auth-related functions can be added here
export const authenticateUser = (phone: string): CancelableRequest<User> => {
  // In a real app, this would validate credentials
  // For now, we'll just fetch a user
  return usersApi.fetchUser();
};