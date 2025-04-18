import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema, User, UserSchema } from '../mongodb/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
    ]), // ✅ Registers User schema
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
