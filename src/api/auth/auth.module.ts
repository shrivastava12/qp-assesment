import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.get<string>('JWTKEY'),
      signOptions: { expiresIn: config.get<number>('TOKEN_EXPIRATION') },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
