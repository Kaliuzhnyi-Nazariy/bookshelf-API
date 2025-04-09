// import * as pactum from 'pactum';
import { logoutCookies } from './logout/logoutCookies.test';
import { logoutCookiesUserAt } from './logout/logoutCookies.userAt.test';
import { logoutHeader } from './logout/logoutHeader.test';
import { logoutHeadersUserAt } from './logout/logoutHeaders.userAt.test';

export function logoutTest() {
  describe('logout', () => {
    // it('should logout', async () => {
    //   await pactum
    //     .spec()
    //     .delete('/auth/logout')
    //     .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
    //     // .withCookies('$S{accessToken}')
    //     .expectStatus(204)
    //     .inspect();
    // });

    // it('should logout with cookies accessToken', async () => {
    //   await pactum
    //     .spec()
    //     .delete('/auth/logout')
    //     // .withHeaders({ Authorization: 'Bearer $S{accessToken}' })
    //     .withCookies('$S{accessToken}')
    //     .expectStatus(204)
    //     .inspect();
    // });

    // it('should logout userAt', async () => {
    //   await pactum
    //     .spec()
    //     .delete('/auth/logout')
    //     .withHeaders({ Authorization: 'Bearer $S{userAt}' })
    //     // .withCookies('$S{accessToken}')
    //     .expectStatus(204)
    //     .inspect();
    // });

    // it('should logout with cookies userAt', async () => {
    //   await pactum
    //     .spec()
    //     .delete('/auth/logout')
    //     // .withHeaders({ Authorization: 'Bearer $S{userAt}' })
    //     .withCookies('$S{userAt}')
    //     .expectStatus(204)
    //     .inspect();
    // });

    logoutHeader();
    logoutCookies();
    logoutHeadersUserAt();
    logoutCookiesUserAt();
  });
}
