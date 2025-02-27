import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUser) {
    return await this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() dto: LoginUser) {
    await this.authService.signin(dto);
    return dto;
  }

  @Delete('logout')
  logout() {
    return 'logout';
  }
}
