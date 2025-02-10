import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/entities/user.entity';
import { Student } from './student/entities/student.entity';

import { AuthModule } from './auth/module/auth.module';
import { UserModule } from './user/modules/user.module';
import { StudentModule } from './student/modules/student.module';

import { UserController } from './user/controller/user.controller';
import { StudentController } from './student/controllers/student.controller';



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
    StudentModule,
    AuthModule,],
  controllers: [AppController, UserController, StudentController],
  providers: [AppService],
})
export class AppModule {}
