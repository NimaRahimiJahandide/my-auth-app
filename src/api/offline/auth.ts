import { createMockCancelableRequest, mockDelay } from '@/api/offline';
import { CancelableRequest, User } from '@/types';

const mockUsers: User[] = [
  {
    gender: 'male',
    name: {
      title: 'Mr',
      first: 'John',
      last: 'Doe',
    },
    location: {
      street: {
        number: 123,
        name: 'Main St',
      },
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postcode: '10001',
      coordinates: {
        latitude: '40.7128',
        longitude: '-74.0060',
      },
      timezone: {
        offset: '-5:00',
        description: 'Eastern Time',
      },
    },
    email: 'john.doe@example.com',
    login: {
      uuid: 'mock-uuid-1',
      username: 'johndoe',
      password: 'password123',
      salt: 'mock-salt',
      md5: 'mock-md5',
      sha1: 'mock-sha1',
      sha256: 'mock-sha256',
    },
    dob: {
      date: '1990-01-01T00:00:00.000Z',
      age: 34,
    },
    registered: {
      date: '2020-01-01T00:00:00.000Z',
      age: 4,
    },
    phone: '(555) 123-4567',
    cell: '(555) 987-6543',
    id: {
      name: 'SSN',
      value: '123-45-6789',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    },
    nat: 'US',
  },
  {
    gender: 'female',
    name: {
      title: 'Ms',
      first: 'Jane',
      last: 'Smith',
    },
    location: {
      street: {
        number: 456,
        name: 'Oak Ave',
      },
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      postcode: '90210',
      coordinates: {
        latitude: '34.0522',
        longitude: '-118.2437',
      },
      timezone: {
        offset: '-8:00',
        description: 'Pacific Time',
      },
    },
    email: 'jane.smith@example.com',
    login: {
      uuid: 'mock-uuid-2',
      username: 'janesmith',
      password: 'password456',
      salt: 'mock-salt-2',
      md5: 'mock-md5-2',
      sha1: 'mock-sha1-2',
      sha256: 'mock-sha256-2',
    },
    dob: {
      date: '1985-05-15T00:00:00.000Z',
      age: 39,
    },
    registered: {
      date: '2019-03-20T00:00:00.000Z',
      age: 5,
    },
    phone: '(555) 234-5678',
    cell: '(555) 876-5432',
    id: {
      name: 'SSN',
      value: '987-65-4321',
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/1.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/1.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
    },
    nat: 'US',
  },
];

export const fetchUser = (): CancelableRequest<User> => {
  return createMockCancelableRequest(async () => {
    await mockDelay();
    return mockUsers[0];
  });
};

export const fetchUsers = (count: number = 10): CancelableRequest<User[]> => {
  return createMockCancelableRequest(async () => {
    await mockDelay();
    return mockUsers.slice(0, Math.min(count, mockUsers.length));
  });
};

export const searchUsers = (params: {
  gender?: 'male' | 'female';
  nat?: string;
  results?: number;
}): CancelableRequest<User[]> => {
  return createMockCancelableRequest(async () => {
    await mockDelay();
    
    let filtered = mockUsers;
    
    if (params.gender) {
      filtered = filtered.filter(user => user.gender === params.gender);
    }
    
    if (params.nat) {
      filtered = filtered.filter(user => user.nat === params.nat);
    }
    
    const results = params.results || filtered.length;
    return filtered.slice(0, results);
  });
};