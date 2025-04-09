import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  // books: Types.ObjectId[];
}

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  // books: Types.ObjectId[];

  @IsNotEmpty()
  @IsString()
  password: string;
}
