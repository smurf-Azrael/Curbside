import { chatGetTests } from './chat-get-tests';
import { chatPostTests } from './chat-post-tests';

export const chatTests = (): void => {
  describe('/chat', () => {
    chatPostTests();
    chatGetTests();
  });
};
