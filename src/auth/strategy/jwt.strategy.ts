import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../../mongodb/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private User: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          if (req.headers.cookie) {
            return req.headers.cookie.split('=')[1];
          }
          if (req.headers['set-cookie']) {
            // console.log('console.cookies', req.headers['set-cookie'][0]);

            return req.headers['set-cookie'][0].split('=')[1];
          }
          if (req.headers.authorization?.startsWith('Bearer ')) {
            return req.headers.authorization.split(' ')[1]; // Remove "Bearer" prefix
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.User.findOne({ email: payload.email }).select(
      '-password -__v',
    );
    return user;
  }
}

// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Model } from 'mongoose';
// import { User } from '../mongodb/schemas';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     config: ConfigService,
//     @InjectModel(User.name) private User: Model<User>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: config.get<string>('JWT_SECRET')!,
//     });
//   }

//   async validate(payload: { email: string }) {
//     const user = await this.User.findOne({ email: payload.email });

//     return { _id: user?._id };
//   }
// }
