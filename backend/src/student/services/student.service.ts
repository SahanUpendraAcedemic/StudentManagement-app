import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private createStudentRepo:Repository<Student>,
    ) {}
    public async getStudentbyId(id){
        const student = await this.createStudentRepo.findOne({
            where: {id: id},
        });
        if(student === null){
            return JSON.stringify("Student not found");
        }else{
            return student;
        }
        
    }

    public async getAllStudents({page: page = 1, limit: limit = 10, search: search = ''}){ {
        const offset = (page-1)*limit;

        const [studentsDetails,total] = await this.createStudentRepo.findAndCount({skip: offset, take: limit});
        if(studentsDetails === null){
                return JSON.stringify("No students found");
         }else{
                return {page,limit,total,studentsDetails};
            }
        
        }
    }

    public async createStudent(createStudentDto:CreateStudentDto){
        const updated_at = new Date();
        const newStudent = this.createStudentRepo.create(createStudentDto);
        newStudent.updated_at=updated_at;
        const enteredStudent = this.createStudentRepo.save(newStudent);
        if(enteredStudent === null){
            return JSON.stringify("Student not created");
        }else{
            return JSON.stringify("Student created");
        } 
    }

    public async updateStudent(updateStudentDto:CreateStudentDto){
        const updated_at = new Date();
        const student = await this.createStudentRepo.findOne({
            where: {id: updateStudentDto.id},
        });
        if(student === null){
            return JSON.stringify("Student not found");
        }else{
            student.student_firstName = updateStudentDto.student_firstName;
            student.student_lastName = updateStudentDto.student_lastName;
            student.student_address = updateStudentDto.student_address;
            student.student_credetialName = updateStudentDto.student_credetialName;
            student.student_dob = updateStudentDto.student_dob;
            student.student_gender = updateStudentDto.student_gender;
            student.formerEducation = updateStudentDto.formerEducation;
            student.enrolldate = updateStudentDto.enrolldate;
            student.enrolled_grade = updateStudentDto.enrolled_grade;
            student.schol_eligibility = updateStudentDto.schol_eligibility;
            student.updated_at = updated_at;
            const updatedStudent = await this.createStudentRepo.save(student);
            return JSON.stringify("Student updated");
        }
        
    }

    public async deleteStudent(student_id){
        const deleteResult = await this.createStudentRepo.delete(student_id);
        if (deleteResult.affected === 0) {
            return JSON.stringify("Student not found");
        } else {
            return JSON.stringify("Student deleted");
        }
        
    }
}