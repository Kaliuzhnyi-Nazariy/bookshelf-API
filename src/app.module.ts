import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
// import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
// import { MongodbService } from './mongodb/mongodb.service';
import { MongodbModule } from './mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/mongodb/schemas';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BookModule,
    AuthModule,
    MongodbModule,
    MongooseModule.forRoot(process.env.DB_CONNECT_LINK as string),
  ],
  // exports: [MongodbModule],
  // controllers: [BookController],
  // providers: [UsersService, AuthService, MongodbService],
})
export class AppModule {}
