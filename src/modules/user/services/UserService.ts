import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, DeepPartial } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { User } from '@app_entities/index';
import { APP_SECRET } from '@config/env';
import { AuthReturn } from '@modules/auth/types/AuthReturn';
import { CreateUserProps } from '../types/CreateUserProps';
import { UpdateUserProps } from '../types/UpdateUserProps';

@Service()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async findAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();

    return users;
  }

  async create({
    name,
    email,
    password,
  }: CreateUserProps): Promise<AuthReturn> {
    const user = await this.userRepository.save({
      name,
      email,
      password: await hash(password, 10),
    });

    const token = sign({ id: user.id }, APP_SECRET, { expiresIn: 864000 });

    return { user, token };
  }

  async update(
    { name, email, password }: UpdateUserProps,
    userId: string
  ): Promise<User> {
    const data: DeepPartial<User> = {
      id: Number(userId),
      name,
      email,
      password,
    };

    const user = await this.userRepository.save({
      ...data,
      password: await hash(password, 10),
    });

    return user;
  }

  async delete(userId: string): Promise<User> {
    const data: DeepPartial<User> = {
      id: Number(userId),
      deleted_at: new Date(),
    };

    const user = await this.userRepository.save(data);

    return user;
  }
}
