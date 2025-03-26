import {
  ForbiddenException,
  HttpException,
  // HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../mongodb/schemas';
import { UserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserSchema: Model<User>) {}

  async updateUser(userId: string | Types.ObjectId, dto: UserDTO) {
    const user = await this.UserSchema.findById(userId);

    if (!user) throw new ForbiddenException('User not found');

    try {
      const newUser = await this.UserSchema.findByIdAndUpdate(userId, dto, {
        new: true,
      });

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
}
