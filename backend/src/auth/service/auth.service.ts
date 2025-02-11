import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../../user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.userService.getUser(email);

    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const checkpwd = await bcrypt.compare(pass, user.password);
      if (checkpwd) {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    }
  }
  async signUp(payload: CreateUserDto) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    payload.password = await bcrypt.hash(payload.password, salt);
    const user = await this.userService.createUser(payload);
    return user;
  }
}
