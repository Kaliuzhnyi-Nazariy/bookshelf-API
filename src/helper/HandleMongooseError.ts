import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { Error as MongooseError } from 'mongoose';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof MongooseError.ValidationError) {
      response.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors: exception.errors,
      });
    } else if ('code' in exception && exception.code === 11000) {
      response.status(409).json({
        statusCode: 409,
        message: 'This credentials already in use',
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Something went wrong!',
      });
    }
  }
}
