import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
}

// mock data
export const users: User[] = [
  { id: 1, username: 'john', password: 'changeme' },
  { id: 2, username: 'chris', password: 'secret' },
];

@Injectable()
export class UsersService {
  // mock test
  // eslint-disable-next-line @typescript-eslint/require-await
  async findUserByUsername(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
