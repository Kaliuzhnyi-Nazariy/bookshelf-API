import * as pactum from 'pactum';

export function patchFailed(startLink: string, endLink: string) {
  describe('patch failed', () => {
    it('failed because lack of token', async () => {
      await pactum
        .spec()
        .patch(`${startLink}/$S{bookId}/${endLink}`)
        // .inspect()
        .expectStatus(401);
    });

    it('failed because of another user token', async () => {
      await pactum
        .spec()
        .patch(`${startLink}/$S{bookId}/${endLink}`)
        .withCookies('accessToken', '$S{userAtn}')
        // .inspect()
        .expectStatus(404);
    });

    it('failed because lack of bookid', async () => {
      await pactum
        .spec()
        .patch(`${startLink}/${endLink}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectStatus(404);
    });

    it('failed because not existed bookid', async () => {
      await pactum
        .spec()
        .patch(`${startLink}/$S{bookId3}/${endLink}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectStatus(404);
    });
  });
}
