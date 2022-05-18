import { favoritesPatchTests } from './favorites-patch-tests';

export const favoritesTests = async (): Promise<void> => {
  describe('/favorites', () => {
    favoritesPatchTests();
  });
};
