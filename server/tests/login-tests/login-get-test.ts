import { server } from '../../index';
import request from 'supertest';
import { getTestIdToken } from '../test-helpers';

export const loginTests = (): void => {
  describe('/login', () => {
    let testToken: string|undefined;

    beforeEach(async () => {
      testToken = await getTestIdToken();
    });

    it('Should attach the users email and id if user is valid', async () => {
      const { body } = await request(server)
        .get('/login')
        .set('Authorization', 'Bearer ' + testToken)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body.data.user).toHaveProperty('email');
      expect(body.data.user).toHaveProperty('id');
    });

    it('Should return the error if user is not valid', async () => {
      const { body } = await request(server)
        .get('/login')
        .set('Authorization', 'Bearer ' + testToken + 'X')
        .expect('Content-Type', /json/)
        .expect(401);
      expect(body).toHaveProperty('error');
    });
  });
};
