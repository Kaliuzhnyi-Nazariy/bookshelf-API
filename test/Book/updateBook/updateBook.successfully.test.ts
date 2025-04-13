import * as pactum from 'pactum';
import {
  readyBookFive,
  readyBookFour,
  readyBookOne,
  readyBookThree,
  readyBookTwo,
  updDTO,
  updDTO2,
} from './updateBook.books.test';

export function successfullyUpdateBookTest(link: string) {
  describe('Successfully update book functions', () => {
    it('update book with token in header', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        // .inspect()
        .withBearerToken('$S{userAt}')
        .withBody(updDTO)
        .expectBody({
          ...readyBookOne,
          _id: '$S{bookId}',
          owner: '$S{userId}',
          __v: 0,
        })
        .expectStatus(200);
    });

    it('update book with token in cookies', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId2}`)
        .inspect()
        .withCookies('accessToken', '$S{userAt}')
        .withBody(updDTO2)
        .expectBody({
          ...readyBookTwo,
          _id: '$S{bookId2}',
          owner: '$S{userId}',
          __v: 0,
        })
        .expectStatus(200);
    });

    it('should return empty array (user in header)', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLength(2)
        // .inspect()
        .expectJsonLike([
          { ...readyBookOne, owner: '$S{userId}', __v: 0 },
          { ...readyBookTwo, owner: '$S{userId}', __v: 0 },
        ])
        .expectStatus(200);
    });

    it('only title field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId2}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          title: updDTO.title,
        })
        .inspect()
        .expectStatus(200)
        .expectJsonLike({ ...readyBookThree, owner: '$S{userId}', __v: 0 });
    });

    it('only author field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          author: updDTO2.author,
        })
        // .inspect()
        .expectStatus(200)
        .expectJsonLike({ ...readyBookFour, owner: '$S{userId}', __v: 0 });
    });

    it('only descriptonAndOpinion field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          descripionAndOpinion: 'How to attack your goals with 10x streingth',
        })
        // .inspect()
        .expectStatus(200)
        .expectJsonLike({ ...readyBookFive, owner: '$S{userId}', __v: 0 });
    });
  });
}
