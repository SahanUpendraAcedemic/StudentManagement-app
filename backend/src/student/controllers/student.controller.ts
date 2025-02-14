import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
  constructor(readonly studentService: StudentService) {}

  @Get('getStudentbyId/:id')
  getStudentbyId(@Param('id') param: number) {
    return this.studentService.getStudentbyId(param);
  }

  @Get('getAllStudents')
  getAllStudents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: any,
  ) {
    return this.studentService.getAllStudents({ page, limit, search });
  }

  @Post('createStudent')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Put('updateStudent')
  updateStudent(@Body() updateStudentDto: CreateStudentDto) {
    return this.studentService.updateStudent(updateStudentDto);
  }

  @Delete('deleteStudent')
  deleteStudent(@Query('id') id: any, @Query('student_id') student_id: any) {
    console.log(id, student_id);
    return this.studentService.deleteStudent(id, student_id);
  }
}
