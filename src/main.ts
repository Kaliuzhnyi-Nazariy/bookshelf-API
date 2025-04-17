import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { MongooseExceptionFilter } from './helper/HandleMongooseError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: '', // it is for a frontend URL

    // origin: '*', // it is for a frontend URL
    // origin: process.env.DEV_FRONTEND_LINK, // it is for a frontend URL
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // app.useGlobalFilters(new MongooseExceptionFilter());

  await app.listen(process.env.PORT ?? 3500);
}
bootstrap();
