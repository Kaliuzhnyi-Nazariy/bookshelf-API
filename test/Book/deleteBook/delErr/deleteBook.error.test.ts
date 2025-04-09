import * as pactum from 'pactum';

const link = '/book';

export function errorDelete() {
  describe('delete books with error', () => {
    it('should return an error as no user', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId}`)
        // .inspect()
        .expectStatus(401)
        .expectBody({ message: 'Unauthorized', statusCode: 401 });
    });

    it('error because no book', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectBody({
          message: 'Book is not found!',
          error: 'Not Found',
          statusCode: 404,
        })
        .expectStatus(404);
    });

    it('error because no book', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId2}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectBody({
          message: 'Book is not found!',
          error: 'Not Found',
          statusCode: 404,
        })
        .expectStatus(404);
    });
  });
}
