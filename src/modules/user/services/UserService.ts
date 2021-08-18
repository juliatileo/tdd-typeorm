import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository, DeepPartial } from 'typeorm';
import { User } from '@app_entities/index';
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

  async create({ name }: CreateUserProps): Promise<User> {
    const user = await this.userRepository.save({ name });

    return user;
  }

  async update({ name }: UpdateUserProps, userId: string): Promise<User> {
    const data: DeepPartial<User> = { id: Number(userId), name };

    const user = await this.userRepository.save(data);

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
