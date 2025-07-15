import { ENV } from '@/config/env';

import * as realUsersApi from '@/api/auth';

import * as mockUsersApi from '@/api/offline/auth';

export const usersApi = ENV.USE_MOCK ? mockUsersApi : realUsersApi;

export type { CancelableRequest } from '@/api';
export { ApiError } from '@/api';