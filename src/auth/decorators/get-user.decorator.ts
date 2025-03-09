import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Types } from 'mongoose';

export const GetUser = createParamDecorator(
  (data: string | Types.ObjectId | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (request.user && data) {
      if (data instanceof Types.ObjectId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return request.user[data.toString()];
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return request.user[data];
      }
    }

    return request.user;
  },
);
