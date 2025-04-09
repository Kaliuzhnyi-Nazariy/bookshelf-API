import * as pactum from 'pactum';

const link = '/auth/logout';

export function logoutHeadersUserAt() {
  describe('logout with userAt token in header', () => {
    it('should logout', async () => {
      await pactum
        .spec()
        .delete(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(204);
      // .inspect();
    });

    it('should not logout as no token', async () => {
      await pactum
        .spec()
        .delete(link)
        .withHeaders({ Authorization: '' })
        .expectStatus(401);
      // .inspect();
    });
  });
}
