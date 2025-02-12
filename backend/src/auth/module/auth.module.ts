import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { UserModule } from 'src/user/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guard/auth.guard';
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
