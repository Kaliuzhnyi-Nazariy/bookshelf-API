import * as pactum from 'pactum';

export function logoutHeader() {
  describe('with header token', () => {
    it('should logout', async () => {
      await pactum
        .spec()
        .delete('/auth/logout')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(204);
      // .inspect();
    });

    it('should not logout with an empty header', async () => {
      await pactum.spec().delete('/auth/logout').expectStatus(401);
    });
  });
}
