import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { MongodbService } from 'src/mongodb/mongodb.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
// import { CreateUser } from '../src/auth/dto';
import { discordTesting, logoutTest, signIn, signUp } from './Auth';

describe('App e2e', () => {
  let app: INestApplication;
  //   let mongoDB: MongodbService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    // mongoDB = app.get(MongodbService);

    await app.listen(3500);
    pactum.request.setBaseUrl('http://localhost:3500');
  });
  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
  signUp();
  signIn();
  discordTesting();
  logoutTest();
});
