import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private createUserRepo:Repository<User>,
    ) {}

    public async getUser(){
        
    }

    public async createUser(createUserDto:CreateUserDto){
        const updated_at = new Date();
        const role = "User"
        const newUser = this.createUserRepo.create(createUserDto);
        newUser.updated_at = updated_at;
        newUser.role = role;
        const enterdUser = this.createUserRepo.save(newUser);
        return enterdUser;
    }

}

