import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import { GetUser } from '../auth/decorators';
import { UltimateGuard } from '../auth/guards';
import { UpdateUserDTO, UserDTO } from './dto';
import { MongooseExceptionFilter } from '../helper/HandleMongooseError';

@UseFilters(new MongooseExceptionFilter())
@UseGuards(UltimateGuard)
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
  ) {
    return this.usersService.updateUser(userId, dto);
  }

  @Delete()
  deleteUser(@GetUser('_id') userId: Types.ObjectId) {
    return this.usersService.deleteUser(userId);
  }
}
