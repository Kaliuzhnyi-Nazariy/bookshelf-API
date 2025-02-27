import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { User } from 'src/mongodb/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userSchema: Model<User>) {}

  async signin(dto: LoginUser) {
    console.log(dto);
    const user = await this.userSchema.findOne({ email: dto.email });
    console.log('user: ', user);
  }

  async signup(dto: CreateUser) {
    const isUser = await this.userSchema.findOne({ email: dto.email });

    if (isUser)
      throw new ForbiddenException(
        'User with this credentials is already exist!',
      );

    if (dto.password !== dto.confirmPassword)
      throw new ForbiddenException('Passwords do not match!');

    const hashedPassword = await argon.hash(dto.password);
    const newUser = await this.userSchema.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const { name, email, _id } = newUser;
    return { name, email, _id };
  }

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  logout() {}
}
