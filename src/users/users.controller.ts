import {
  Body,
  Controller,
  Get,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';
import { GetUser } from '../auth/decorators';
import { UltimateGuard } from '../auth/guards';
import { UserDTO } from './dto';
import { MongooseExceptionFilter } from '../helper/HandleMongooseError';

@UseGuards(UltimateGuard)
// @UseGuards(JWTGuard, DiscordGuard)
@Controller('users')
@UseFilters(new MongooseExceptionFilter())
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
    @Body() dto: UserDTO,
  ) {
    return this.usersService.updateUser(userId, dto);
  }
}
