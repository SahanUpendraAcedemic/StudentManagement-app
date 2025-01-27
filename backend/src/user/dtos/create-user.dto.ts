import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
/*
*A data transfer object (DTO) is an object that carries data between processes. 
*The data is transferred inside the DTO, and the DTO is sent to the destination.
*In this case, the CreateUserDto is used to transfer data between the client and the server.
*This DTO is lacking common class-validator
*/
export class CreateUserDto { 
    @IsString()
    name: string;

    @IsEmail()
    email: string;   

    @IsString()
    password: string;  

    @IsString()
    role: string;
    created_at: Date;
    updated_at: Date;
}
