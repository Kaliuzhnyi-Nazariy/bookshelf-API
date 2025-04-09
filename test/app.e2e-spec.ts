import { INestApplication, ValidationPipe } from '@nestjs/common';
// import { MongodbService } from 'src/mongodb/mongodb.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
// import { CreateUser } from '../src/auth/dto';
import { logoutTest, signIn, signUp } from './Auth';
import { deleteUser, updateUser, usersTests } from './Users';
import { Model } from 'mongoose';
import { Book, User } from 'src/mongodb/schemas';
import { getModelToken } from '@nestjs/mongoose';
import { addBook, getAllBooks, getOneBook, successful_addBook } from './Book';
import { updateBook } from './Book/updateBook';
import { deleteBook } from './Book/deleteBook';

describe('App e2e', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let bookModel: Model<Book>;

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

    userModel = moduleRef.get<Model<User>>(getModelToken('User'));
    bookModel = moduleRef.get<Model<Book>>(getModelToken('Book'));
  });
  afterAll(async () => {
    if (app) {
      await userModel.deleteMany({});
      await bookModel.deleteMany({});
      await app.close();
    }
  });
  signUp();
  usersTests();
  updateUser();
  logoutTest();
  signIn();
  getAllBooks();
  addBook();
  updateBook();
  getOneBook();
  deleteBook();
  successful_addBook();
  deleteUser();
});
