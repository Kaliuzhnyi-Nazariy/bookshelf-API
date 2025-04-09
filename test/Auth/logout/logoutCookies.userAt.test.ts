import * as pactum from 'pactum';
import { CreateUser } from 'src/auth/dto';

export function logoutCookiesUserAt() {
  const dto: CreateUser = {
    name: 'vasya1',
    email: 'vasya1@mail.com',
    password: 'Passw0rd!',
    confirmPassword: 'Passw0rd!',
  };

  const link = '/auth/logout';

  describe('should logout with userAt token in cookies', () => {
    it('should sign in', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(200)
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
        .delete(link)
        .withCookies('accessToken', '$S{userAtn}')
        .expectStatus(204);
      // .inspect();
    });

    it('shouldn not logout', async () => {
      await pactum
        .spec()
        .delete(link)
        .withCookies('accessToken', '')
        .expectStatus(401);
      // .inspect();
    });
  });
}
