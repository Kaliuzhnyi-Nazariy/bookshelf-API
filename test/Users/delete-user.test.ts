import * as pactum from 'pactum';

export function deleteUser() {
  describe('delete user', () => {
    it('should delete user', async () => {
      await pactum
        .spec()
        .delete('/users')
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectStatus(204);
    });

    it('should return an error as no user', async () => {
      await pactum
        .spec()
        .delete('/users')
        .withBearerToken('$S{userAtasd}')
        // .inspect()
        .expectStatus(401);
    });
  });
}
