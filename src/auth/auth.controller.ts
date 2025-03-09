import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateUser, LoginUser } from './dto';
import { AuthService } from './auth.service';
import { DiscordGuard, JWTGuard } from './guards';
// import { GetUser } from './decorators';
// import { Types } from 'mongoose';
import { Request, Response } from 'express';
import { MongooseExceptionFilter } from 'src/helper/HandleMongooseError';

@Controller('auth')
@UseFilters(new MongooseExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUser, @Res() res: Response) {
    return await this.authService.signup(dto, res);
  }

  @HttpCode(200)
  @Post('signin')
  async signIn(@Body() dto: LoginUser, @Res() res: Response) {
    return await this.authService.signin(dto, res);
  }

  @Get('signin/discord')
  @UseGuards(DiscordGuard)
  discordLogin() {
    // This route redirects to Discord for authentication
    return 'redirecting';
  }

  @Get('signin/discord/redirect')
  @UseGuards(DiscordGuard)
  discordRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.discordAuth(req, res);
  }

  @Get('check')
  check_func(@Req() req: Request, @Res() res: Response) {
    return this.authService.discordAuthRedirect(req, res);
  }

  @Delete('logout')
  @UseGuards(JWTGuard)
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
