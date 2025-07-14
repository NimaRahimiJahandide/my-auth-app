import { ApiResponse } from './types';
import { User } from '../../types';

const API_BASE_URL = 'https://randomuser.me/api';

export const fetchUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/?results=1&nat=us`);
    
    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data: ApiResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new ApiError('No user data received from API');
    }

    return data.results[0];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
};

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}