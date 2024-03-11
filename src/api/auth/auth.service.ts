import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from 'src/models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    console.log(email, password, 'test');
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestException('User does not exists.');
    }

    const match = await this.comparePassword(password, user.password);
    if (!match) {
      throw new ForbiddenException('Password does not matched.');
    }
    return user;
  }

  public async login(user) {
    const userInfo = await this.validateUser(user.email, user.password);

    if (userInfo) {
      delete userInfo.password;
      const token = await this.generateToken(userInfo);
      return { userInfo, token };
    }
  }

  public async create(user) {
    const userExist = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (userExist) {
      throw new ForbiddenException('This email already exists');
    }
    const pass = await this.hashPassword(user.password);
    const role = UserRole.User;
    try {
      const newUser = await User.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        password: pass,
        role: role,
        active: true,
      });
      const token = await this.generateToken(newUser);
      delete newUser.password;
      return { user: newUser, token };
    } catch (error) {
      throw new BadRequestException({ message: error.errors[0].message });
    }
    return;
  }

  private async generateToken(user: User) {
    const token = await this.jwtService.signAsync({ user });
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  private async comparePassword(password: string, dbPassword: string) {
    const match = await bcrypt.compare(password, dbPassword);
    return match;
  }
}
