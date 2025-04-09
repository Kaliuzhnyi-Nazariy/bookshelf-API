import { failedUPDBook } from './updateBook.failing.test';
import { successfullyUpdateBookTest } from './updateBook.successfully.test';

export function updateBook() {
  const link = '/book';
  describe('updateBook testing', () => {
    successfullyUpdateBookTest(link);
    failedUPDBook(link);
  });
}
