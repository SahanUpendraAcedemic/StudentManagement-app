import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';

import { User } from '../entities/user.entity';
import { UserSchema } from '../schema/user.schema';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
