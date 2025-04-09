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
        .withBearerToken('$S{userAt}')
        .withBody(updDTO);
      // .inspect();
    });

    it('update book with token in cookies', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId2}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody(updDTO2);
      // .inspect();
    });

    it('should return empty array (user in header)', async () => {
      await pactum
        .spec()
        .get(link)
        .withHeaders({ Authorization: 'Bearer $S{userAt}' })
        .expectJsonLength(2)
        .expectJsonLike([
          { ...readyBookOne, owner: '$S{userId}', __v: 0 },
          { ...readyBookTwo, owner: '$S{userId}', __v: 0 },
        ])
        .expectStatus(200);
      // .inspect();
    });

    it('only title field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId2}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          title: updDTO.title,
        })
        .expectStatus(200)
        .expectJsonLike({ ...readyBookThree, owner: '$S{userId}', __v: 0 });
      // .inspect();
    });

    it('only author field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          author: updDTO2.author,
        })
        .expectStatus(200)
        .expectJsonLike({ ...readyBookFour, owner: '$S{userId}', __v: 0 });
      // .inspect();
    });

    it('only descriptonAndOpinion field', async () => {
      await pactum
        .spec()
        .put(`${link}/$S{bookId}`)
        .withCookies('accessToken', '$S{userAt}')
        .withBody({
          descripionAndOpinion: 'How to attack your goals with 10x streingth',
        })
        .expectStatus(200)
        .expectJsonLike({ ...readyBookFive, owner: '$S{userId}', __v: 0 });
      // .inspect();
    });
  });
}
