import { isDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,IsDate, notEquals } from 'class-validator';

export class BaseUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(100)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;   

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string;  

    @IsString() 
    role?: string;
}