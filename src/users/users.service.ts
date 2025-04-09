import {
  ForbiddenException,
  HttpException,
  // HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, User } from '../mongodb/schemas';
import { UpdateUserDTO } from './dto';
import * as argon from 'argon2';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserSchema: Model<User>,
    @InjectModel(Book.name) private BookSchema: Model<Book>,
  ) {}

  async updateUser(userId: string | Types.ObjectId, dto: UpdateUserDTO) {
    const user = await this.UserSchema.findById(userId);

    if (!user) throw new ForbiddenException('User not found');

    try {
      const hashedPassword = await argon.hash(dto.password);

      const newUser = await this.UserSchema.findByIdAndUpdate(
        userId,
        { ...dto, password: hashedPassword },
        {
          new: true,
        },
      );

      if (!newUser) {
        const error = 'Something went wrong!';
        throw new HttpException(
          {
            status: 500,
            error,
          },
          500,
          {
            cause: error,
          },
        );
      }
      const { _id, name, email } = newUser;

      return { _id, name, email };
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === 11000)
        throw new HttpException(
          {
            statusCode: 409,
            message: 'This credentials is in use!',
          },
          409,
        );
    }
    // I need to add duplicate error mongoose

    // const { name, email, _id } = newUser;
    // return { name, email, _id };
  }

  async deleteUser(userId: Types.ObjectId, @Res() res: Response) {
    const user = await this.UserSchema.findById(userId);

    await this.BookSchema.deleteMany({ owner: userId });

    if (!user) throw new NotFoundException('User not found!');

    await this.UserSchema.findByIdAndDelete(userId);

    return res.clearCookie('accessToken').status(204).json();
  }
}
