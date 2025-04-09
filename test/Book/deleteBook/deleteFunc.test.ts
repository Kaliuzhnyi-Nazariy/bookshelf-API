import * as pactum from 'pactum';
import { errorDelete, notThatUser } from './delErr';

export function deleteBook() {
  const link = '/book';
  describe('delete book func', () => {
    notThatUser();

    it('should delete book one', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectStatus(200)
        .expectBody({ message: 'Deleted successfully!' });
    });

    it('should be 1 book', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLength(1)
        .expectStatus(200);
      // .inspect();
    });

    it('should delete second book', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId2}`)
        .withCookies('accessToken', '$S{userAt}')
        // .inspect()
        .expectStatus(200)
        .expectBody({ message: 'Deleted successfully!' });
    });

    it('should be empty array', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        // .inspect()
        .expectJsonLength(0)
        .expectStatus(200);
    });

    errorDelete();
  });
}
