import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas';
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          return req.cookies?.accessToken as string;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { email: string }) {
    const user = await this.User.findOne({ email: payload.email });
    return { _id: user?._id };
  }
}

// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Model } from 'mongoose';
// import { User } from 'src/mongodb/schemas';
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
