import { CancelTokenSource } from 'axios';
import { apiClient, createCancelableRequest, handleApiResponse, CancelableRequest } from '@/api';
import { User, ApiResponse } from '@/types/index';

export const fetchUser = (): CancelableRequest<User> => {
  return createCancelableRequest(async (cancelToken: CancelTokenSource) => {
    const response = await apiClient.get<ApiResponse>('/?results=1&nat=us', {
      cancelToken: cancelToken.token,
    });
    
    const data = handleApiResponse(response);
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No user data received from API');
    }
    
    return data.results[0];
  });
};

export const fetchUsers = (count: number = 10): CancelableRequest<User[]> => {
  return createCancelableRequest(async (cancelToken: CancelTokenSource) => {
    const response = await apiClient.get<ApiResponse>(`/?results=${count}&nat=us`, {
      cancelToken: cancelToken.token,
    });
    
    const data = handleApiResponse(response);
    return data.results || [];
  });
};

// Search users by criteria
export const searchUsers = (params: {
  gender?: 'male' | 'female';
  nat?: string;
  results?: number;
}): CancelableRequest<User[]> => {
  return createCancelableRequest(async (cancelToken: CancelTokenSource) => {
    const queryParams = new URLSearchParams();
    
    if (params.gender) queryParams.append('gender', params.gender);
    if (params.nat) queryParams.append('nat', params.nat);
    if (params.results) queryParams.append('results', params.results.toString());
    
    const response = await apiClient.get<ApiResponse>(`/?${queryParams.toString()}`, {
      cancelToken: cancelToken.token,
    });
    
    const data = handleApiResponse(response);
    return data.results || [];
  });
};