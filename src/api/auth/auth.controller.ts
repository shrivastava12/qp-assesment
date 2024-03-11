import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return await this.authService.login(body);
  }

  @Post('signup')
  async signUp(@Body() user) {
    console.log('User', user);
    return await this.authService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  test() {
    return {
      message: 'successfull',
    };
  }
}
