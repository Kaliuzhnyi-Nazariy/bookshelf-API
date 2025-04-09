import * as pactum from 'pactum';
import { Book } from 'src/mongodb/schemas';

const link = '/book';

const bookReceived: Book = {
  title: 'Law of success',
  author: 'Somebody',
  descripionAndOpinion: 'How to attack your goals with 10x streingth',
  imageUrl: '',
};

const bookReceivedTwo: Book = {
  title: 'Law of success',
  author: 'Somebody',
  descripionAndOpinion: '',
  imageUrl: '',
};

export function getOneBook() {
  describe('get one book function', () => {
    it('should return book 1', async () => {
      await pactum
        .spec()
        .get(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAt}')
        .expectStatus(200)
        // .inspect()
        .expectBody({
          ...bookReceived,
          _id: '$S{bookId}',
          owner: '$S{userId}',
          __v: 0,
        });
    });

    it('should return book 2', async () => {
      await pactum
        .spec()
        .get(`${link}/$S{bookId2}`)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectStatus(200)
        // .inspect()
        .expectBody({
          ...bookReceivedTwo,
          _id: '$S{bookId2}',
          owner: '$S{userId}',
          __v: 0,
        });
    });

    it('should return an error', async () => {
      await pactum
        .spec()
        .get(`${link}/$S{userId}`)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        // .inspect()
        .expectBody({
          message: 'Book have not been found',
          error: 'Not Found',
          statusCode: 404,
        })
        .expectStatus(404);
    });

    it('should return an error 2', async () => {
      await pactum
        .spec()
        .get(`${link}/$S{bookId}`)
        .withHeaders({ Authorization: 'Bearer $S{userAtn}' })
        // .inspect()
        .expectBody({
          message: 'Book have not been found',
          error: 'Not Found',
          statusCode: 404,
        })
        .expectStatus(404);
    });
  });
}
