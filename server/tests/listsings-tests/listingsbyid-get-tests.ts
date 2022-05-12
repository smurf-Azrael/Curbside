import { server, app } from '../../index';
import request from 'supertest';
import { prisma } from '../../prisma/client';
import { InitialUserDTO } from '../../interfaces/users.interface.dto';
import { mocks } from '../../../mocks';
import { AddListingDTO } from '../../interfaces/listings.interface.dto';
import { IListingCondition } from '../../interfaces/listing.interface';
import { AddRatingsDTO } from '../../interfaces/ratings.interface.dto';
import { LISTING_NOT_FOUND } from '../../errors/SharedErrorMessages';

export const getListingsByIdTests = (): void => {
  describe('GET /listings/:id', () => {
    const mockInitialUserInput1: InitialUserDTO = {
      id: mocks.Users[0].id,
      email: mocks.Users[0].email,
      emailVerified: mocks.Users[0].emailVerified,
      photoUrl: mocks.Users[0].photoUrl
    };
    const mockInitialUserInput2: InitialUserDTO = {
      id: mocks.Users[1].id,
      email: mocks.Users[1].email,
      emailVerified: mocks.Users[1].emailVerified,
      photoUrl: mocks.Users[1].photoUrl

    };
    const mockInitialUserInput3: InitialUserDTO = {
      id: mocks.Users[2].id,
      email: mocks.Users[2].email,
      emailVerified: mocks.Users[2].emailVerified,
      photoUrl: mocks.Users[2].photoUrl

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

    let listingFromDb: any;

    beforeAll(async () => {
      await prisma.user.create({ data: mockInitialUserInput1 });
      await prisma.user.create({ data: mockInitialUserInput2 });
      await prisma.user.create({ data: mockInitialUserInput3 });
      listingFromDb = await prisma.listing.create({ data: mockAddListing });
      await prisma.rating.create({ data: mockAddRating1 });
      await prisma.rating.create({ data: mockAddRating2 });
    });

    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should find listings and return it with the userPhoto and rating', async () => {
      const id = listingFromDb.id;
      const { body, statusCode } = await request(app)
        .get(`/listings/${id}`);

      expect(statusCode).toEqual(200);
      expect(body.listing.id).toEqual(id);
      expect(body.listing.rating).toEqual(4);
      expect(body.listing.userPhotoUrl).toEqual(mockInitialUserInput1.photoUrl);
      expect(body.listing.userId).toEqual(listingFromDb.userId);
      expect(body.listing.title).toEqual(listingFromDb.title);
      expect(body.listing.description).toEqual(listingFromDb.description);
      expect(body.listing.priceInCents).toEqual(listingFromDb.priceInCents);
      expect(body.listing.condition).toEqual(listingFromDb.condition);
      expect(body.listing.photoUrls).toEqual(listingFromDb.photoUrls);
      expect(body.listing.longitude).toEqual(listingFromDb.longitude);
      expect(body.listing.latitude).toEqual(listingFromDb.latitude);
      expect(body.listing.status).toEqual('available');
      expect(body.listing.createdAt).toEqual(listingFromDb.createdAt.toISOString());
    });
    it('Should send 404 if listing can be found', async () => {
      const { body, statusCode } = await request(app)
        .get('/listings/NONE');
      console.log('body', body);
      expect(statusCode).toEqual(404);
      expect(body.error).toEqual(LISTING_NOT_FOUND);
    });
  });
};
