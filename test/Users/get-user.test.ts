import * as pactum from 'pactum';

export function usersTests() {
  describe('users/get', () => {
    it('should return user', async () => {
      await pactum
        .spec()
        .get('/users/me')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLike({
          _id: /.+/,
          name: 'vasya',
          email: 'vasya@mail.com',
          books: [],
        })
        .expectStatus(200);
      // .inspect();
    });

    it('should return an error as no token', async () => {
      await pactum.spec().get('/users/me').expectStatus(403).expectBody({
        message: 'Forbidden resource',
        error: 'Forbidden',
        statusCode: 403,
      });
    });
  });
}
