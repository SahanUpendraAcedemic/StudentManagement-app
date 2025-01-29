import { isDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength,IsDate, notEquals } from 'class-validator';
/*
*A data transfer object (DTO) is an object that carries data between processes. 
*The data is transferred inside the DTO, and the DTO is sent to the destination.
*In this case, the CreateUserDto is used to transfer data between the client and the server.
*This DTO is lacking common class-validator
*/
export class CreateUserDto { 
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

    @IsDate()
    created_at: Date;

    updated_at?: Date;
}
