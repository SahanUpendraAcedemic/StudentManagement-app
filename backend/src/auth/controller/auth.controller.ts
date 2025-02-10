import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from '../strat/public-strategy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signDto: Record<string, any>) {
    console.log(signDto.password);
    return this.authService.signIn(signDto.email, signDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signDto: Record<string, any>) {
    const credentials = {
      name: signDto.name,
      password: signDto.password,
      email: signDto.email,
      role: signDto.role,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return this.authService.signUp(credentials);
  }
}
