import { Injectable } from '@nestjs/common';
import { Student } from '../schema/students.schema';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private createStudentRepo: Model<Student>,
  ) {}

  public async getStudentbyId(sid: any) {
    const studentid = sid;
    console.log(studentid);
    const student = await this.createStudentRepo.findOne({
      _id: studentid,
    });
    if (student === null) {
      return JSON.stringify('Student not found');
    } else {
      return student;
    }
  }

  public async getAllStudents({ page = 1, limit = 10, search = '' }) {
    const offset = (page - 1) * limit;

    // Constructing a proper search query
    const searchQuery = search
      ? {
          $or: [
            { student_firstName: { $regex: search, $options: 'i' } }, // Case-insensitive search
            { student_lastName: { $regex: search, $options: 'i' } },
            { student_address: { $regex: search, $options: 'i' } },
            { student_credetialName: { $regex: search, $options: 'i' } },
          ],
        }
      : {}; // Empty object when no search term

    // Fetch students
    const studentsDetails = await this.createStudentRepo
      .find(searchQuery)
      .skip(offset)
      .limit(limit)
      .exec();

    // Count total documents
    const total = await this.createStudentRepo.countDocuments(searchQuery);

    return {
      page,
      limit,
      total,
      studentsDetails,
    };
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
      student_id: updateStudentDto.student_id,
    });
    if (student === null) {
      return JSON.stringify('Student not found');
    } else {
      if (
        student.student_firstName !== updateStudentDto.student_firstName ||
        student.student_lastName !== updateStudentDto.student_lastName
      ) {
        student.student_firstName = updateStudentDto.student_firstName;
        student.student_lastName = updateStudentDto.student_lastName;
      }
      student.student_address = updateStudentDto.student_address;
      student.student_credetialName = updateStudentDto.student_credetialName;
      student.student_dob = updateStudentDto.student_dob;
      student.student_gender = updateStudentDto.student_gender;
      student.formerEducation = updateStudentDto.formerEducation;
      student.enrolldate = updateStudentDto.enrolldate;
      student.enrolled_grade = updateStudentDto.enrolled_grade;
      student.schol_eligibility = updateStudentDto.schol_eligibility;
      student.updated_at = updated_at;
      console.log(student);
      const updatedStudent = await this.createStudentRepo.findByIdAndUpdate(
        student._id,
        student,
        { new: true },
      );
      return updatedStudent;
    }
  }

  public async deleteStudent(id: string, student_id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid student ID format');
    }

    const deleteResult = await this.createStudentRepo.deleteOne({
      _id: new Types.ObjectId(id), // Correct way to convert to ObjectId
      student_id,
    });

    if (deleteResult.deletedCount === 0) {
      return JSON.stringify('Student not found');
    } else {
      return JSON.stringify('Student deleted');
    }
  }
}
