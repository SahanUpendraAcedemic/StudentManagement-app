import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';
import { Student } from './student/student.entity';

import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

import { UserController } from './user/user.controller';
import { StudentController } from './student/student.controller';


@Module({
  imports: [UserModule,
    TypeOrmModule.forRootAsync({
      imports:[],
      inject: [],
      useFactory: () => ({type: 'postgres', 
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'StudentManagement-app',
        entities: [User,Student],
        synchronize: true,
      }), 
    }),
    StudentModule,],
  controllers: [AppController, UserController, StudentController],
  providers: [AppService],
})
export class AppModule {}
