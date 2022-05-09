import { usersPostTests } from './users-post-tests';
export const usersTests = async (): Promise<void> => {
  describe('/users', () => {
    usersPostTests();
  });
};
