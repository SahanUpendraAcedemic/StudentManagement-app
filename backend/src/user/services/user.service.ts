import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    //@InjectRepository(User)
    //private createUserRepo: Repository<User>,
    @InjectModel(User.name)
    private createUserRepo: Model<User>,
  ) {}

  public async getUser(email: string): Promise<User | null> {
    return await this.createUserRepo.findOne({ email: email });
  }

  public async createUser(createUserDto: CreateUserDto) {
    if (await this.getUser(createUserDto.email)) {
      throw new Error('User already exists');
    }
    const newUser = new this.createUserRepo({
      ...createUserDto,
      created_at: new Date(),
    });
    console.log(newUser);

    return await newUser.save();
  }
}
