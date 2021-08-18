import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { User } from '@app_entities/index';
import { APP_SECRET } from '@config/env';
import { HTTPError, HTTPStatus } from '@shared/errors/index';
import { AuthProps } from '../types/AuthProps';
import { AuthReturn } from '../types/AuthReturn';

@Service()
export class AuthService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async login({ email, password }: AuthProps): Promise<AuthReturn> {
    const user: User = await this.userRepository.findOne({
      where: { email },
    });

    if (!(await compare(password, user.password)))
      throw new HTTPError(HTTPStatus.UNAUTHORIZED, "password doesn't match");

    const token: string = sign({ id: user.id }, APP_SECRET, {
      expiresIn: 864000,
    });

    return { user, token };
  }
}
