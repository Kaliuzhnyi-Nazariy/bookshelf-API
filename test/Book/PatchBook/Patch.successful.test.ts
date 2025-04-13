import * as pactum from 'pactum';
import { Book } from 'src/mongodb/schemas';

export function patchSuc(startLink: string, endLink: string) {
  const bookReceived: Book = {
    title: 'Law of success',
    author: 'Somebody',
    descripionAndOpinion: 'How to attack your goals with 10x streingth',
    favorite: true,
    imageUrl: '',
  };

  describe('should successfully patch favorite field', () => {
    it('should return updated book', async () => {
      await pactum
        .spec()
        .patch(`${startLink}/$S{bookId}/${endLink}`)
        .withBearerToken('$S{userAt}')
        // .inspect()
        .expectBody({
          ...bookReceived,
          _id: '$S{bookId}',
          owner: '$S{userId}',
          __v: 0,
        })
        .expectStatus(200);
    });
  });
}
