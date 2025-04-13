import { patchFailed } from './Patch.failed.test';
import { patchSuc } from './Patch.successful.test';

export function patchFunc() {
  const startLink = '/book';
  const endLink = 'favorite';

  patchSuc(startLink, endLink);
  patchFailed(startLink, endLink);
}
