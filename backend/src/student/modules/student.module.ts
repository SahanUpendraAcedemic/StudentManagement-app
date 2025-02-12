import { Module } from '@nestjs/common';
import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';

import { Student } from '../schema/students.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../schema/students.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
