import { server } from '..';
import { prisma } from '../prisma/client';
import { listingsTests } from './listsings-tests/listings-test';
import { getListingsByIdTests } from './listsings-tests/listingsbyid-get-tests';
import { usersTests } from './users-tests/users-test';

describe('Backend Server End-To-End Tests', () => {
  beforeAll(async () => {
    await prisma.listing.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();
  });

  usersTests();
  listingsTests();
  getListingsByIdTests();

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });
});
