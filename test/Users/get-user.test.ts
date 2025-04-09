import * as pactum from 'pactum';

export function usersTests() {
  describe('users/get', () => {
    it('should return user', async () => {
      await pactum
        .spec()
        .get('/users/me')
        .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
        .expectJsonLike({
          _id: /.+/,
          name: 'vasya',
          email: 'vasya@mail.com',
          // books: [],
        })
        .expectStatus(200);
    });

    it('should return user (token in cookies)', async () => {
      await pactum
        .spec()
        .get('/users/me')
        .withCookies('accessToken', '$S{accessToken}')
        .expectJsonLike({
          _id: /.+/,
          name: 'vasya',
          email: 'vasya@mail.com',
          // books: [],
        })
        .expectStatus(200);
    });

    it('should return an error as no token', async () => {
      await pactum.spec().get('/users/me').expectStatus(401).expectBody({
        message: 'Unauthorized',
        statusCode: 401,
      });
      // .inspect();
    });
  });
}
