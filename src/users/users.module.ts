import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema, User, UserSchema } from '../mongodb/schemas';
import { CreateTokenService } from 'src/helper/create-token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]), // ✅ Registers User schema
  ],
  controllers: [UsersController],
  providers: [UsersService, CreateTokenService, JwtService],
})
export class UsersModule {}
