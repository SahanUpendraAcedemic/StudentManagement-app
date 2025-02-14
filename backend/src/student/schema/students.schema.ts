import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  student_id: string;

  @Prop()
  student_firstName: string;

  @Prop()
  student_lastName: string;

  @Prop()
  student_credetialName: string;

  @Prop()
  student_address: string;

  @Prop()
  student_gender: string;

  @Prop()
  student_dob: Date;

  @Prop()
  enrolldate: Date;

  @Prop()
  formerEducation: string;

  @Prop()
  enrolled_grade: number;

  @Prop()
  schol_eligibility: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
