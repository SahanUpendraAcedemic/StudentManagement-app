import { Column, Entity,PrimaryColumn,PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id:number;

    @PrimaryColumn()
    student_id:string;

    @Column()
    student_firstName:string;

    @Column()
    student_lastName:string;

    @Column()
    student_credetialName:string;

    @Column()
    student_address:string;

    @Column()
    student_gender:string;

    @Column()
    student_dob:Date;

    @Column()
    enrolldate:Date;

    @Column()
    formerEducation:string;

    @Column()
    enrolled_grade:number;

    @Column()
    schol_eligibility:string;

    @Column()
    created_at:Date;
    
    @Column()
    updated_at:Date;
}