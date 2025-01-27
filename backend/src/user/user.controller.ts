import { Body, Controller, Post,Req} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

/**
 * The UserController is a class that handles the incoming HTTP requests for the User entity.
 * It is decorated with the @Controller decorator to define the base path for the routes in this controller.
 * The @Post decorator is used to define a POST route for the /signup path.
 * The create method is a route handler that receives the incoming request and processes it.
 * The @Body decorator is used to extract the request body from the incoming request.
 * The ValidationPipe is used to validate the incoming request body against the CreateUserDto class.
 */

@Controller('user')
export class UserController {
    @Post('/signup')
    create(
        /*@Body() reqest: CreateUserDto,
        CreateUserDto: CreateUserDto,*/
        @Req() req: Request, 
        @Body() body: CreateUserDto,
    ){
        console.log(CreateUserDto);
        return CreateUserDto;
        
    }
    
}
