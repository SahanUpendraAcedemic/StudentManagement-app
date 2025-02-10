import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guard/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register(
      {
        global: true,
        secret:jwtConstants.secret,
        signOptions: { expiresIn: '1d' }
      }),
      TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass:AuthGuard,
  },
    AuthService ],
  exports: [AuthService]
})
export class AuthModule {}
