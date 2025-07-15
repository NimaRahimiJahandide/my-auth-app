import { Infer, object, string, number, boolean, nullable, func, array, unknown } from 'superstruct';

// User related schemas
export const UserName = object({
  title: string(),
  first: string(),
  last: string(),
});

export const UserLocation = object({
  street: object({
    number: number(),
    name: string(),
  }),
  city: string(),
  state: string(),
  country: string(),
  postcode: string(),
  coordinates: object({
    latitude: string(),
    longitude: string(),
  }),
  timezone: object({
    offset: string(),
    description: string(),
  }),
});

export const UserLogin = object({
  uuid: string(),
  username: string(),
  password: string(),
  salt: string(),
  md5: string(),
  sha1: string(),
  sha256: string(),
});

export const UserDob = object({
  date: string(),
  age: number(),
});

export const UserRegistered = object({
  date: string(),
  age: number(),
});

export const UserPicture = object({
  large: string(),
  medium: string(),
  thumbnail: string(),
});

export const UserId = object({
  name: string(),
  value: string(),
});

export const User = object({
  gender: string(),
  name: UserName,
  location: UserLocation,
  email: string(),
  login: UserLogin,
  dob: UserDob,
  registered: UserRegistered,
  phone: string(),
  cell: string(),
  id: UserId,
  picture: UserPicture,
  nat: string(),
});

export const ApiInfo = object({
  seed: string(),
  results: number(),
  page: number(),
  version: string(),
});

export const ApiResponse = object({
  results: array(User),
  info: ApiInfo,
});

export const LoginCredentials = object({
  phone: string(),
});

export const AuthContextType = object({
  user: nullable(User),
  login: func(),
  logout: func(),
  isLoading: boolean(),
});

export const ApiErrorResponse = object({
  message: string(),
  status: number(),
});

export const CancelableRequest = object({
  cancel: func(),
  promise: unknown(), // Promise type
});

declare global {
  type UserName = Infer<typeof UserName>;
  type UserLocation = Infer<typeof UserLocation>;
  type UserLogin = Infer<typeof UserLogin>;
  type UserDob = Infer<typeof UserDob>;
  type UserRegistered = Infer<typeof UserRegistered>;
  type UserPicture = Infer<typeof UserPicture>;
  type UserId = Infer<typeof UserId>;
  type User = Infer<typeof User>;
  type ApiInfo = Infer<typeof ApiInfo>;
  type ApiResponse = Infer<typeof ApiResponse>;
  type LoginCredentials = Infer<typeof LoginCredentials>;
  type AuthContextType = Infer<typeof AuthContextType>;
  type ApiErrorResponse = Infer<typeof ApiErrorResponse>;
  interface CancelableRequest<T = unknown> {
    cancel: () => void;
    promise: Promise<T>;
  }
}