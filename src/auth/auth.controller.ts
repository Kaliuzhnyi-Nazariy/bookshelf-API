import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signUp(@Body() dto: CreateUser) {
    return dto;
  }

  @Post('signin')
  signIn(@Body() dto: LoginUser) {
    return dto;
  }

  @Delete('logout')
  logout() {
    return 'logout';
  }
}
