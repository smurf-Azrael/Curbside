import { server } from '..';
import { prisma } from '../prisma/client';
import { chatTests } from './chat-tests/chat-tests';
import { listingsTests } from './listsings-tests/listings-test';
import { usersTests } from './users-tests/users-test';

describe('Backend Server End-To-End Tests', () => {
  beforeAll(async () => {
    await prisma.listing.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();
  });

  usersTests();
  listingsTests();
  chatTests();
  afterAll(async () => {
    server.close();
  });
});
