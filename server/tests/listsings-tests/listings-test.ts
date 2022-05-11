import { listingsGetTests } from './listings-get-tests';
import { listingsPostTests } from './listings-post-tests';
export const listingsTests = async (): Promise<void> => {
  describe('/listings', () => {
    listingsPostTests();
    listingsGetTests();
  });
};
