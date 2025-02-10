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

    public async getUser(email:string): Promise<User | null> {
        return await this.createUserRepo.findOneBy({ email: email });
    }

    public async createUser(createUserDto:CreateUserDto){
        return this.createUserRepo.save({
            ...createUserDto,
            created_at: new Date(),
            });
        }
}

