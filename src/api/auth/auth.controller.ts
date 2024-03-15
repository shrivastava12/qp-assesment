import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IToken } from 'src/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *
   * @param body
   * @returns Promise<IToken | string
   */
  @Post('login')
  async login(@Body() body): Promise<IToken | string> {
    return await this.authService.login(body);
  }

  /**
   *
   * @param user
   * @returns Promise<IToken | string
   */
  @Post('signup')
  async signUp(@Body() user): Promise<IToken | string> {
    return await this.authService.create(user);
  }
}
