import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import { GetUser } from '../auth/decorators';
import { JWTGuard } from '../auth/guards';
import { UpdateUserDTO, UserDTO } from './dto';
import { MongooseExceptionFilter } from '../helper/HandleMongooseError';
import { Response } from 'express';

@UseFilters(new MongooseExceptionFilter())
@UseGuards(JWTGuard)
// @UseGuards(JWTGuard, DiscordGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@GetUser() user: UserDTO) {
    // console.log(user);
    return user;
  }

  @Put()
  updateUser(
    @GetUser('_id') userId: string | Types.ObjectId,
    @Body() dto: UpdateUserDTO,
    @Res() res: Response,
  ) {
    return this.usersService.updateUser(userId, dto, res);
  }

  @Delete()
  deleteUser(@GetUser('_id') userId: Types.ObjectId, @Res() res: Response) {
    return this.usersService.deleteUser(userId, res);
  }
}
