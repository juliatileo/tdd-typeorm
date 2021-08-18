import {
  Get,
  JsonController,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { User } from '@app_entities/index';
import { UserService } from '../services/UserService';
import { CreateUserProps } from '../types/CreateUserProps';
import { UpdateUserProps } from '../types/UpdateUserProps';

@Service()
@JsonController('/users')
export default class UserController {
  @Inject()
  private userService: UserService;

  @Get()
  async show(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  async create(@Body() body: CreateUserProps): Promise<User> {
    return this.userService.create(body);
  }

  @Put('/:user_id')
  async update(
    @Body() body: UpdateUserProps,
    @Param('user_id') userId: string
  ): Promise<User> {
    return this.userService.update(body, userId);
  }

  @Delete('/:user_id')
  async delete(@Param('user_id') userId: string): Promise<User> {
    return this.userService.delete(userId);
  }
}
