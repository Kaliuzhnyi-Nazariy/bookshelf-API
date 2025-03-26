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
// import { User, UserSchema } from '../mongodb/schemas';
// import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
    CloudinaryModule,
  ],
  providers: [CloudinaryService],
  // exports: [MongodbModule],
  // controllers: [BookController],
  // providers: [UsersService, AuthService, MongodbService],
})
export class AppModule {}
