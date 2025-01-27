import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

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
        entities: [User],
        synchronize: true,
      }), 
    }),],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
