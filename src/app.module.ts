import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, BookModule, AuthModule],
  controllers: [BookController],
  providers: [UsersService, AuthService],
})
export class AppModule {}
