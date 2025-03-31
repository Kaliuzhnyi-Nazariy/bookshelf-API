import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from '../../mongodb/schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'Discord') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private User: Model<User>,
  ) {
    super({
      clientID: config.get<string>('APPLICATON_ID_DISCORD')!,
      clientSecret: config.get<string>('CLIENT_SECRET_DISCORD')!,
      callbackURL: config.get<string>('REDIRECT_URI_DISCORD'),
      scope: ['identify', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { username, email } = profile as { username: string; email: string };
    // console.log('profile: ', profile);

    // console.log('username in discord: ', username);
    // console.log('email in discord: ', email);

    if (!email || !username) {
      throw new ForbiddenException('No credentials provided by Discord');
    }

    // Check if user already exists
    const user = await this.User.findOne({ email });

    // console.log('all data: ', {
    //   _id: user?._id,
    //   name: username ?? 'No data',
    //   email: email ?? 'No data',
    // });

    return {
      _id: user?._id,
      name: username ?? 'No data',
      email: email ?? 'No data',
    };
  }
}
