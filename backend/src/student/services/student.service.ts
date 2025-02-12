import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';
import { Student } from '../schema/students.schema';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private createStudentRepo: Model<Student>,
  ) {}

  public async getStudentbyId(sid: string | number) {
    const studentid = Number(sid); //convert to number if not
    const student = await this.createStudentRepo.findOne({
      where: { id: studentid },
    });
    if (student === null) {
      return JSON.stringify('Student not found');
    } else {
      return student;
    }
  }

  public async getAllStudents({
    page: page = 1,
    limit: limit = 10,
    search: search,
  }) {
    {
      const offset = (page - 1) * limit;

      const searchQuery = search
        ? [
            { student_firstName: ILike(`%${search}%`) },
            { student_lastName: ILike(`%${search}%`) },
            { student_address: ILike(`%${search}%`) },
            { student_credetialName: ILike(`%${search}%`) },
          ]
        : [];

      const studentsDetails = await this.createStudentRepo
        .find({
          $or: searchQuery,
        })
        .skip(offset)
        .limit(limit)
        .exec();

      const total = await this.createStudentRepo.countDocuments({
        $or: searchQuery,
      });

      if (studentsDetails === null) {
        return JSON.stringify('No students found');
      } else {
        return { page, limit, total, studentsDetails };
      }
    }
  }

  public async createStudent(createStudentDto: CreateStudentDto) {
    const updated_at = new Date();
    const newStudent = await this.createStudentRepo.create(createStudentDto);
    newStudent.updated_at = updated_at;
    const enteredStudent = await newStudent.save();
    if (enteredStudent === null) {
      return JSON.stringify('Student not created');
    } else {
      return JSON.stringify('Student created');
    }
  }

  public async updateStudent(updateStudentDto: CreateStudentDto) {
    const updated_at = new Date();
    const student = await this.createStudentRepo.findOne({
      where: { id: updateStudentDto.id },
    });
    if (student === null) {
      return JSON.stringify('Student not found');
    } else {
      student.student_firstName = updateStudentDto.student_firstName;
      student.student_lastName = updateStudentDto.student_lastName;
      student.student_address = updateStudentDto.student_address;
      student.student_credentialName = updateStudentDto.student_credetialName;
      student.student_dob = updateStudentDto.student_dob;
      student.student_gender = updateStudentDto.student_gender;
      student.formerEducation = updateStudentDto.formerEducation;
      student.student_enrolldate = updateStudentDto.enrolldate;
      student.enrolled_grade = updateStudentDto.enrolled_grade;
      student.schol_eligibility = updateStudentDto.schol_eligibility;
      student.updated_at = updated_at;
      const updatedStudent = await this.createStudentRepo.findByIdAndUpdate(
        student._id,
        student,
        { new: true },
      );
      return updatedStudent
        ? JSON.stringify('Student updated')
        : JSON.stringify('Student not updated');
    }
  }

  public async deleteStudent(id: number | string, student_id: string | number) {
    const parsedId = typeof id === 'string' ? parseInt(id, 10) : id;
    const deleteResult = await this.createStudentRepo.deleteOne({
      id: parsedId,
      student_id,
    });

    if (deleteResult.deletedCount === 0) {
      return JSON.stringify('Student not found');
    } else {
      return JSON.stringify('Student deleted');
    }
  }
}
