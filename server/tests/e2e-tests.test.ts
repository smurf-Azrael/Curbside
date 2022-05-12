import { server } from '..';
import { prisma } from '../prisma/client';
import { listingsTests } from './listings-tests/listings-test';
import { usersTests } from './users-tests/users-test';

describe('Backend Server End-To-End Tests', () => {
  beforeAll(async () => {
    await prisma.listing.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();
  });

  usersTests();
  listingsTests();

  afterAll(async () => {
    server.close();
  });
});
