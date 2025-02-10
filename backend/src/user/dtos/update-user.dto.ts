import { CreateUserDto } from './create-user.dto';
import { IsDate } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @IsDate()
  updated_at?: Date;
}