import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const createdUser = new this.UserModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = this.UserModel.findOne({ email });
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Adjust according to your security requirements
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
