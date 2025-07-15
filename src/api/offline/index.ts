import { CancelableRequest } from '@/types';

const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const createMockCancelableRequest = <T>(
  mockFn: () => Promise<T>
): CancelableRequest<T> => {
  let isCanceled = false;
  
  const promise = mockFn().then(result => {
    if (isCanceled) {
      throw new Error('Request was canceled');
    }
    return result;
  });

  return {
    promise,
    cancel: () => {
      isCanceled = true;
    },
  };
};

export { mockDelay };