import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DiscordStrategy, JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/mongodb/schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Registers User schema
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DiscordStrategy],
})
export class AuthModule {}
