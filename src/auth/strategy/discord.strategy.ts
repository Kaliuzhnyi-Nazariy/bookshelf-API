import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { username, email } = profile;
    // console.log('profile: ', profile);

    if (!email) {
      throw new ForbiddenException('No email provided by Discord');
    }

    // Check if user already exists
    const user = await this.User.findOne({ email });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { _id: user?._id, name: username, email };
  }
}
