import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/module/auth.module';
import { UserModule } from './user/modules/user.module';
import { StudentModule } from './student/modules/student.module';

import { UserController } from './user/controller/user.controller';
import { StudentController } from './student/controllers/student.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGO');
        console.log(mongoUri);
        if (!mongoUri) {
          throw new Error('MONGO_URL is not defined in .env file');
        }
        return { uri: mongoUri };
      },
    }),

    UserModule,
    StudentModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, StudentController],
  providers: [AppService],
})
export class AppModule {}
