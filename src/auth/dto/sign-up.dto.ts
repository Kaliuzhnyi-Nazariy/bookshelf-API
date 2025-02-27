import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '../decorators';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  password: string;

  @IsString()
  @IsNotEmpty()
  //Match is decorator
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
