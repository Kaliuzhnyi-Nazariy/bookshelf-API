import * as pactum from 'pactum';
import { Book } from '../../../src/mongodb/schemas';
import { successful_addBook } from './successful_add.test';
import { unsuc_addBook } from './unsuc_addBook.test';

const link = '/book';

export function addBook() {
  const readyBook: Book = {
    title: 'think and grow rich',
    author: 'Calagher',
  };

  const readyBook2: Book = {
    title: 'think and grow rich',
    author: 'Napoleon Hill',
  };

  describe('addBook tests', () => {
    successful_addBook();
    it('should receive books (token in header)', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLike([readyBook, readyBook2])
        .expectStatus(200);
      // .inspect();
    });

    it('should receive books (token in cookies)', async () => {
      await pactum
        .spec()
        .get(link)
        .withCookies('accessToken', '$S{userAt}')
        .expectJsonLike([readyBook, readyBook2])
        .expectStatus(200);
      // .inspect();
    });

    it('should receive empty array (token in cookies)', async () => {
      await pactum
        .spec()
        .get(link)
        .withCookies('accessToken', '$S{userAtn}')
        .expectBody([])
        .expectStatus(200);
      // .inspect();
    });

    it('should receive empty array (token in header)', async () => {
      await pactum
        .spec()
        .get(link)
        .withBearerToken('$S{userAtn}')
        .expectBody([])
        .expectStatus(200);
      // .inspect();
    });

    unsuc_addBook();
  });
}
