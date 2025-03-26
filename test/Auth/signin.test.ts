import * as pactum from 'pactum';
import { LoginUser } from 'src/auth/dto';

export function signIn() {
  const dto: LoginUser = {
    email: 'vasya@mail.com',
    password: 'Passw0rd!',
  };

  describe('Sign in', () => {
    it('should sign in', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        // .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains('_id')
        .expectBodyContains('name')
        .expectBodyContains('email')
        .expectCookiesLike('accessToken', /.+/)
        .expectCookiesLike('Expires', /.+/)
        .expectCookiesLike('Max-Age', /.+/)
        .expectCookiesLike('Path', '/')
        .stores('userAt', 'accessToken')
        // .stores('accessToken', 'hello')
        .inspect();
    });
    it('should sign in with token', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains('_id')
        .expectBodyContains('name')
        .expectBodyContains('email')
        .expectCookiesLike('accessToken', /.+/)
        .expectCookiesLike('Expires', /.+/)
        .expectCookiesLike('Max-Age', /.+/)
        .expectCookiesLike('Path', '/');
    });
    it('should not sign in because of lack of email', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password,
        })
        .expectStatus(400);
    });
    it('should not sign in because of lack of password', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });
    it('should not sign in because of lack of password', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email,
        })
        .expectStatus(400);
    });
  });
}
