import * as pactum from 'pactum';
import { CreateUser } from 'src/auth/dto';

export function logoutCookies() {
  const dto: CreateUser = {
    name: 'vasya1',
    email: 'vasya1@mail.com',
    password: 'Passw0rd!',
    confirmPassword: 'Passw0rd!',
  };

  describe('logout with cookies', () => {
    it('create new user', async () => {
      await pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201)
        .expectBodyContains('_id')
        .expectBodyContains('name')
        .expectBodyContains('email')
        .expectCookiesLike('accessToken', /.+/)
        .expectCookiesLike('Expires', /.+/)
        .expectCookiesLike('Max-Age', /.+/)
        .expectCookiesLike('Path', '/')
        .stores('userAtn', 'accessToken');
      // .inspect();
    });

    it('should logout', async () => {
      await pactum
        .spec()
        .delete('/auth/logout')
        .withCookies('accessToken', '$S{userAtn}')
        .expectStatus(204);
      // .inspect();
    });

    it('should not logout as no cookie', async () => {
      await pactum
        .spec()
        .delete('/auth/logout')
        .withCookies('accessToken', '')
        .expectStatus(401);
      // .inspect();
    });
  });
}
