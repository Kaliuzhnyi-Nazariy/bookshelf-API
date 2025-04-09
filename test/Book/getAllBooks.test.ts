import * as pactum from 'pactum';

const link = '/book';

export function getAllBooks() {
  describe('getAllBooks function', () => {
    it('should return empty array (user in header)', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectBody([])
        .expectStatus(200);
      // .inspect();
    });

    it('should return empty array (user in cookies)', async () => {
      await pactum
        .spec()
        .get(link)
        .withCookies('accessToken', '$S{userAt}')
        .expectBody([])
        .expectStatus(200);
      // .inspect();
    });

    it('should return an error as no user', async () => {
      await pactum.spec().get(link).expectStatus(401);
      // .inspect();
    });
  });
}
