import * as pactum from 'pactum';

export function logoutTest() {
  describe('logout', () => {
    it('should logout', async () => {
      await pactum
        .spec()
        .delete('/auth/logout')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        // .withCookies('$S{userAt}')
        .expectStatus(204)
        .inspect();
    });

    it('should logout with accessToken', async () => {
      await pactum
        .spec()
        .delete('/auth/logout')
        // .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withCookies('$S{userAt}')
        .expectStatus(204)
        .inspect();
    });
  });
}
