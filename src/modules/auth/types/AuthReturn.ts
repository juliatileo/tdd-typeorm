import { User } from '@database/app/entity';

export interface AuthReturn {
  user: User;
  token: string;
}
