import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserRole } from 'src/models';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    const match = await this.comparePassword(password, user.password);
    if (!match) {
      return null;
    }

    return user;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(user) {
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
      });
      const token = await this.generateToken(newUser);
      return { user: newUser, token };
    } catch (error) {
      throw new BadRequestException({ message: error.errors[0].message });
    }
    return;
  }

  private async generateToken(user) {
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
