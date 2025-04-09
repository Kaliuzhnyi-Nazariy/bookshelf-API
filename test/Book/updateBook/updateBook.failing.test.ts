import * as pactum from 'pactum';
import { UpdateBook } from 'src/book/dto';

export function failedUPDBook(link: string) {
  const updDTO: UpdateBook = {
    title: '10x Rule',
    author: 'Somebody',
  };

  describe('update failed', () => {
    it('failed because of lack of token', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withBody(updDTO)
        .expectStatus(401);
      // .inspect();
    });

    it('failed because of another user token', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAtn}')
        .withBody(updDTO)
        // .inspect()
        .expectBody({
          message: 'This book is not found',
          error: 'Not Found',
          statusCode: 404,
        })
        .expectStatus(404);
    });
  });
}
