import * as pactum from 'pactum';

import { AddBook } from '../../../src/book/dto';

const link = '/book';

export function unsuc_addBook() {
  const dto: AddBook = {
    title: 'think and grow rich',
    author: 'Calagher',
  };

  const dto2: AddBook = {
    title: 'think and grow rich',
    author: 'Napoleon Hill',
  };

  describe('Book not added', () => {
    it('should return error Unauthorized no bearer', async () => {
      await pactum
        .spec()
        .post(link)
        .withBearerToken('')
        .withBody(dto)
        .expectStatus(401);
    });

    it('should return error Unauthorized no cookies', async () => {
      await pactum
        .spec()
        .post(link)
        .withCookies('accessToken', '')
        .withBody(dto2)
        .expectStatus(401);
      // .inspect();
    });

    it('error because of lack of author with bearer token', async () => {
      await pactum
        .spec()
        .post(link)
        .withBearerToken('$S{accessToken}')
        .withBody({ title: dto.title })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          statusCode: 400,
          message: ['author should not be empty', 'author must be a string'],
        });
      // .inspect();
    });

    it('error because of lack of title with bearer token', async () => {
      await pactum
        .spec()
        .post(link)
        .withBearerToken('$S{accessToken}')
        .withBody({ author: dto.author })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          statusCode: 400,
          message: ['title should not be empty', 'title must be a string'],
        });
      // .inspect();
    });

    it('error because of lack of author with cookies', async () => {
      await pactum
        .spec()
        .post(link)
        .withCookies('accessToken', '$S{accessToken}')
        .withBody({ title: dto.title })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          statusCode: 400,
          message: ['author should not be empty', 'author must be a string'],
        });
      // .inspect();
    });

    it('error because of lack of title with cookies', async () => {
      await pactum
        .spec()
        .post(link)
        .withCookies('accessToken', '$S{accessToken}')
        .withBody({ author: dto.author })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          statusCode: 400,
          message: ['title should not be empty', 'title must be a string'],
        });
      // .inspect();
    });
  });
}
