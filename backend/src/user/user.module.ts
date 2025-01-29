import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [UserService],
  controllers:[UserController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}  
