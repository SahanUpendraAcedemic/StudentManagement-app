import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private createStudentRepo:Repository<Student>,
    ) {}

    public async getStudentbyId(sid : string|number){
        const studentid = Number(sid); //convert to number if not
        const student = await this.createStudentRepo.findOne({
            where: {id: studentid},
        });
        if(student === null){
            return JSON.stringify("Student not found");
        }else{
            return student;
        }
        
    }

    public async getAllStudents({page: page = 1, limit: limit = 10, search: search}){ {
        console.log(page,limit,search);

        const offset = (page-1)*limit;
        const searchQuery = search ?    
             [
                {student_firstName: ILike(`%${search}%`)},
                {student_lastName: ILike(`%${search}%`)},
                {student_address: ILike(`%${search}%`)},
                {student_credetialName: ILike(`%${search}%`)},
            ] : [];

        const [studentsDetails,total] = await this.createStudentRepo.findAndCount({
            where: search ? searchQuery : undefined,
            skip: offset, take: limit,
            
        });

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

    public async deleteStudent(id:number|string,student_id:string|number){
        const parsedId = typeof id === 'string' ? parseInt(id, 10) : id;
        const deleteResult = await this.createStudentRepo
        .createQueryBuilder()
        .delete()
        .from('student') // Table name
        .where("id = :id AND student_id = :student_id", { id: parsedId, student_id })
        .execute();

        if (deleteResult.affected === 0) {
            return JSON.stringify("Student not found");
        } else {
            return JSON.stringify("Student deleted");
        }
    }
}