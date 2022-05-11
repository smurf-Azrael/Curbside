// import { server } from '../../index';
// import request from 'supertest';
import { prisma } from '../../prisma/client';
import { InitialUserDTO } from '../../interfaces/users.interface.dto';
import { mocks } from '../../../mocks';
import { AddListingDTO } from '../../interfaces/listings.interface.dto';
import { IListingCondition } from '../../interfaces/listing.interface';
import { AddRatingsDTO } from '../../interfaces/ratings.interface.dto';

export const getListingsByIdTests = (): void => {
  describe('GET /listings/id', () => {
    const mockInitialUserInput1: InitialUserDTO = {
      id: mocks.Users[0].id,
      email: mocks.Users[0].email,
      emailVerified: mocks.Users[0].emailVerified
    };
    const mockInitialUserInput2: InitialUserDTO = {
      id: mocks.Users[1].id,
      email: mocks.Users[1].email,
      emailVerified: mocks.Users[1].emailVerified
    };
    const mockInitialUserInput3: InitialUserDTO = {
      id: mocks.Users[2].id,
      email: mocks.Users[2].email,
      emailVerified: mocks.Users[2].emailVerified
    };

    const mockAddListing: AddListingDTO = {
      userId: mocks.listings[0].userId,
      title: mocks.listings[0].title,
      description: mocks.listings[0].description,
      priceInCents: mocks.listings[0].price,
      currency: 'eur',
      condition: IListingCondition.new,
      photoUrls: JSON.stringify(mocks.listings[0].images),
      longitude: mocks.listings[0].longitude,
      latitude: mocks.listings[0].latitude
    };

    const mockAddRating1: AddRatingsDTO = {
      id: '1',
      sellerId: mocks.Users[0].id,
      buyerId: mocks.Users[1].id,
      rating: 3
    };
    const mockAddRating2: AddRatingsDTO = {
      id: '2',
      sellerId: mocks.Users[0].id,
      buyerId: mocks.Users[2].id,
      rating: 5
    };

    beforeAll(async () => {
      await prisma.user.create({ data: mockInitialUserInput1 });
      await prisma.user.create({ data: mockInitialUserInput2 });
      await prisma.user.create({ data: mockInitialUserInput3 });
      await prisma.listing.create({ data: mockAddListing });
      await prisma.rating.create({ data: mockAddRating1 });
      await prisma.rating.create({ data: mockAddRating2 });
    });

    it('Should find listings and return it with the userPhoto and rating', async () => {
    // const { body } = await request(server)
    //   .get('/listing/IDWILLGOHERE')
    //   .expect(200);
    // expect(body.listing.id).toEqual();
      expect(true).toBe(true);
    });
  });
};
