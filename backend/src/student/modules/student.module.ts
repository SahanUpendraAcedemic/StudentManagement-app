import { Module } from '@nestjs/common';
import { StudentController } from '../controllers/student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

@Module({
    controllers: [StudentController],
    providers: [StudentService],
    imports: [TypeOrmModule.forFeature([Student])],
    exports: [StudentService],
})
export class StudentModule {}
