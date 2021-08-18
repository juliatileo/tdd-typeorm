import { JsonController, Post, Body } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { AuthProps } from '../types/AuthProps';
import { AuthService } from '../services/AuthService';
import { AuthReturn } from '../types/AuthReturn';

@Service()
@JsonController('/auth')
export default class AuthController {
  @Inject()
  authService: AuthService;

  @Post('/login')
  async login(@Body() body: AuthProps): Promise<AuthReturn> {
    return this.authService.login(body);
  }
}
