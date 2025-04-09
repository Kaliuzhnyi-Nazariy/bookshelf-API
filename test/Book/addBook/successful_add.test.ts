import * as pactum from 'pactum';
import { AddBook } from '../../../src/book/dto';
import { Book } from '../../../src/mongodb/schemas/book.schema';

const link = '/book';

export function successful_addBook() {
  const dto: AddBook = {
    title: 'think and grow rich',
    author: 'Calagher',
  };

  const dto2: AddBook = {
    title: 'think and grow rich',
    author: 'Napoleon Hill',
  };

  const readyBook: Book = {
    title: 'think and grow rich',
    author: 'Calagher',
  };

  const readyBook2: Book = {
    title: 'think and grow rich',
    author: 'Napoleon Hill',
  };

  describe('Book added successfuly', () => {
    it('add book 1 (token in headers)', async () => {
      await pactum
        .spec()
        .post(link)
        .withBearerToken('$S{userAt}')
        .withBody(dto)
        .expectStatus(201)
        .expectJsonLike(readyBook)
        .stores('bookId', '_id');
    });

    it('should add book 2 (token in cookies)', async () => {
      await pactum
        .spec()
        .post(link)
        .withCookies('accessToken', '$S{userAt}')
        .withBody(dto2)
        .expectStatus(201)
        .expectJsonLike(readyBook2)
        .stores('bookId2', '_id');
      // .inspect();
    });
  });
}
