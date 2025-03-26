import * as pactum from 'pactum';
import { CreateUser } from '../../src/auth/dto';
pactum.settings.setLogLevel('INFO');
export function signUp() {
  describe('Auth', () => {
    const dto: CreateUser = {
      name: 'vasya',
      email: 'vasya@mail.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    it('should sign up', async () => {
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
        .stores('accessToken', 'res.cookies.accessToken')
        .inspect();
    });

    describe('Sign up', () => {
      it('should return an 400 error as no email', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            name: dto.name,
            password: dto.password,
            confirmPassword: dto.confirmPassword,
          })
          .expectStatus(400);
      });

      it('should return an 400 error as no name', () => {
        pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
            password: dto.password,
            confirmPassword: dto.confirmPassword,
          })
          .expectStatus(400);
      });

      it('should return an 400 error as no passwords do not match', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            name: dto.email,
            email: dto.email,
            password: dto.password,
            confirmPassword: '1231',
          })
          .expectStatus(400);
        // .inspect();
      });

      it('should return an 400 error as no password', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            name: dto.email,
            email: dto.email,
            confirmPassword: '1231',
          })
          .expectStatus(400);
      });

      it('should return an 400 error as no confirmPassword', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            name: dto.email,
            email: dto.email,
            password: dto.password,
          })
          .expectStatus(400);
      });

      it('should return error as trying to copy credentials', async () => {
        await pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(409);
      });
    });
  });
}
