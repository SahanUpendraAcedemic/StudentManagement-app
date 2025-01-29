import { IsDate, IsEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateStudentDto{
    
    @IsNumber()
    @IsEmpty()
    id:number;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_id:string;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_firstName:string;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_lastName:string;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_credetialName:string;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_address:string;

    @IsEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    student_gender:string;

    @IsEmpty()
    @IsDate()
    student_dob:Date;

    @IsEmpty()
    @IsDate()
    enrolldate:Date;

    @IsEmpty()
    @IsString()
    formerEducation:string;

    @IsEmpty()
    @IsNumber()
    @MinLength(1)
    @MaxLength(2)
    enrolled_grade:number;

    @IsEmpty()
    @IsString()
    schol_eligibility:string;

    @IsEmpty()
    @IsDate()
    created_at:Date;

    @IsDate()
    updated_at?:Date;
}