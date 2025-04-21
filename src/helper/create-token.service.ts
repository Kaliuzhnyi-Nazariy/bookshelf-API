import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class CreateTokenService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signToken(email: string, _id: Types.ObjectId): Promise<string> {
    const payload = {
      email,
      _id,
    };

    const secret: string = this.config.get('JWT_SECRET') as string;

    const token: string = await this.jwt.signAsync(payload, {
      expiresIn: '23h',
      secret,
    });

    return token;
  }
}
