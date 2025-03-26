import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UltimateGuard implements CanActivate {
  private JwtGuard: CanActivate;
  private DSGuard: CanActivate;

  constructor(
    // private jwtService: JwtService,
    private reflector: Reflector,
  ) {
    this.JwtGuard = new (AuthGuard('jwt'))();
    this.DSGuard = new (AuthGuard('discord'))();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const jwtRes = await this.JwtGuard.canActivate(context);
      if (jwtRes) return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
      /* empty */
    }

    try {
      const DisRes = await this.DSGuard.canActivate(context);
      if (DisRes) return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log(error);
    }

    return false;
  }
}
