import * as pactum from 'pactum';
import { CreateUser } from 'src/auth/dto';
import { UpdateUserDTO } from 'src/users/dto';

// const bearerToken = 'Bearer $S{userAt}';

export function updateUser() {
  const userDto: UpdateUserDTO = {
    name: 'Vasily',
    email: 'vasily_off@mail.com',
    books: [],
    password: 'Abcde12!',
  };

  const dto: CreateUser = {
    name: 'vasya',
    email: 'vasya@mail.com',
    password: 'Passw0rd!',
    confirmPassword: 'Passw0rd!',
  };

  const link = '/users';

  describe('Update user tests', () => {
    it('should update user info', async () => {
      await pactum
        .spec()
        .put(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withBody(userDto)
        .expectJsonLike({
          _id: /.+/,
          name: userDto.name,
          email: userDto.email,
        })
        .expectStatus(200);
    });

    describe('it should not change info on which previously user changed.', () => {
      it('create new user', () => {
        pactum
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
          .stores('accessToken', 'res.cookies.accessToken');
      });

      it('should not change on info that was appear just before', () => {
        pactum
          .spec()
          .put('/users')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(userDto)
          .expectBody({ message: 'This credentials is in use!' })
          .expectStatus(409);
      });
    });

    it('should return an error if no name field', async () => {
      await pactum
        .spec()
        .put(link)
        .withBearerToken('$S{userAt}')
        // .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .withBody({
          email: userDto.email,
          password: userDto.password,
        })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          message: ['name should not be empty', 'name must be a string'],
          statusCode: 400,
        })
        .inspect();
    });

    it('should return an error if no email fiield', () => {
      pactum
        .spec()
        .put(link)
        .withBearerToken('$S{userAt}')
        .withBody({ name: userDto.name, password: userDto.password })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          message: ['email should not be empty', 'email must be a string'],
          statusCode: 400,
        });
    });

    it('should return an error if no password fiield', () => {
      pactum
        .spec()
        .put(link)
        .withBearerToken('$S{userAt}')
        .withBody({ name: userDto.name, email: userDto.email })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          message: [
            'password should not be empty',
            'password must be a string',
          ],
          statusCode: 400,
        });
    });
    it('should return an error if no email and name fiields', () => {
      pactum
        .spec()
        .put(link)
        .withBearerToken('$S{userAt}')
        .withBody({ password: userDto.password })
        .expectStatus(400)
        .expectBody({
          error: 'Bad Request',
          message: [
            'name should not be empty',
            'name must be a string',
            'email should not be empty',
            'email must be a string',
          ],
          statusCode: 400,
        });
    });
  });
}
