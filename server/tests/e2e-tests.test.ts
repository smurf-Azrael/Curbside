import { server } from '..';
import { prisma } from '../prisma/client';
import { listingsTests } from './listsings-tests/listings-test';
<<<<<<< HEAD
import { getListingsByIdTests } from './listsings-tests/listingsbyid-get-tests';
=======
import { loginTests } from './login-tests/login-get-test';
>>>>>>> 208bd9918396b4b62e0c03af372a332a4990abff
import { usersTests } from './users-tests/users-test';

describe('Backend Server End-To-End Tests', () => {
  beforeAll(async () => {
    await prisma.listing.deleteMany();
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();
  });

  usersTests();
  listingsTests();
<<<<<<< HEAD
  getListingsByIdTests();

=======
  loginTests();
>>>>>>> 208bd9918396b4b62e0c03af372a332a4990abff
  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });
});
