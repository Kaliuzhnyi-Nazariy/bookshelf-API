import { AuthGuard } from '@nestjs/passport';

export class DiscordGuard extends AuthGuard('Discord') {
  constructor() {
    super();
  }
}
