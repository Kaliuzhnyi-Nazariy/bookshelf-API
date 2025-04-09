import * as pactum from 'pactum';

const link = '/book';

export function notThatUser() {
  describe('not correct user test', () => {
    it('should return 404', async () => {
      await pactum
        .spec()
        .delete(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAtn}')
        // .inspect()
        .expectStatus(404);
    });
  });
}
