import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import { MongooseExceptionFilter } from './helper/HandleMongooseError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: [
    //   'https://my-fav-bookshelf-app.netlify.app',
    //   'http://localhost:4200',
    // ], // it is for a frontend URL
    // origin: 'http://my-fav-bookshelf-app.netlify.app', // it is for a frontend URL
    // origin: '*', // it is for a frontend URL
    // origin: process.env.DEV_FRONTEND_LINK, // it is for a frontend URL
    origin: [
      'https://my-fav-bookshelf-app.netlify.app',
      'http://localhost:4200',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
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
