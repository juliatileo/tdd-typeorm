import {
  Get,
  JsonController,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Authorized,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { User } from '@app_entities/index';
import { AuthReturn } from '@modules/auth/types/AuthReturn';
import { UserService } from '../services/UserService';
import { CreateUserProps } from '../types/CreateUserProps';
import { UpdateUserProps } from '../types/UpdateUserProps';

@Service()
@JsonController('/users')
export default class UserController {
  @Inject()
  private userService: UserService;

  @Authorized()
  @Get()
  async show(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  async create(@Body() body: CreateUserProps): Promise<AuthReturn> {
    return this.userService.create(body);
  }

  @Authorized()
  @Put('/:user_id')
  async update(
    @Body() body: UpdateUserProps,
    @Param('user_id') userId: string
  ): Promise<User> {
    return this.userService.update(body, userId);
  }

  @Authorized()
  @Delete('/:user_id')
  async delete(@Param('user_id') userId: string): Promise<User> {
    return this.userService.delete(userId);
  }
}
