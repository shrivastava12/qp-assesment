import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Post('signup')
  async signUp(@Body() user) {
    console.log('User', user);
    return await this.authService.create(user);
  }
}
