import * as pactum from 'pactum';

export function discordTesting() {
  describe('Tesing discord auth', () => {
    it('/auth/discord', async () => {
      await pactum
        .spec()
        .get('/auth/discord')
        .inspect()
        .expectStatus(302)
        .expectCookiesLike('userDisInfo', /.+/)
        .expectBody({
          _id: /\w+/,
          name: 'knaz_music',
          email: 'nazgem83@gmail.com',
          // books: [],
        });
    });

    //need to be remake
    it('/auth/discord/redirect success', async () => {
      await pactum
        .spec()
        .post('/auth/discord/redirect')
        .inspect()
        .withCookies(
          'userDisInfo',
          JSON.stringify({ name: 'knaz_music', email: 'nazgem83@gmail.com' }),
        )
        .withHeaders({
          cookie: {
            'set-cookie': JSON.stringify({
              name: 'knaz_music',
              email: 'nazgem83@gmail.com',
            }),
          },
        })
        .expectCookiesLike('accessToken', /.+/)
        .expectJsonMatch({
          _id: /\w+/,
          name: 'knaz_music',
          email: 'nazgem83@gmail.com',
          // books: [],
        })
        .expectStatus(302);
    });

    it('/auth/discord/redirect no user', async () => {
      await pactum
        .spec()
        .get('/auth/discord/redirect')
        .withCookies('userDisInfo', null)
        .inspect()
        .expectStatus(400);
    });
  });
}
