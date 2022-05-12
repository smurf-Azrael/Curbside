import request from 'supertest';
import { server } from '../..';
import { CreateChatInputDTO } from '../../interfaces/chat.interface.dto';
import { IListingCondition } from '../../interfaces/listing.interface';
import { AddListingDTO } from '../../interfaces/listings.interface.dto';
import { InitialUserDTO } from '../../interfaces/users.interface.dto';
import { prisma } from '../../prisma/client';
import { getTestIdToken } from '../test-helpers';

export const chatGetTests = (): void => {
  describe('/chat GET', () => {
    let buyer, seller, listing;
    let testToken: string|undefined;
    let mockAddChat: CreateChatInputDTO;
    beforeAll(async () => {
      const mockUser1: InitialUserDTO = {
        id: process.env.SECRET_UID!,
        email: 'mockuser@test.com',
        emailVerified: true
      };
      const mockUser2: InitialUserDTO = {
        id: process.env.SECRET_UID2!,
        email: 'mockuser2@test.com',
        emailVerified: true
      };
      const mockListing: AddListingDTO = {
        userId: process.env.SECRET_UID2!,
        condition: IListingCondition.new,
        currency: 'eur',
        description: 'Mock description',
        latitude: 52.52,
        longitude: 13.405,
        photoUrls: JSON.stringify(['https://secure.img1-ag.wfcdn.com/im/54089193/resize-h600-w600%5Ecompr-r85/1231/123110031/Daulton+20%27%27+Wide+Velvet+Side+Chair.jpg']),
        priceInCents: 9090,
        title: 'Mock Chat Listing'
      };

      buyer = await prisma.user.create({ data: mockUser1 });
      seller = await prisma.user.create({ data: mockUser2 });
      listing = await prisma.listing.create({ data: mockListing });

      testToken = await getTestIdToken();

      mockAddChat = { buyerId: buyer.id, sellerId: seller.id, listingId: listing.id };
    });

    afterEach(async () => {
      await prisma.chat.deleteMany();
    });

    it('Should add a chat to the database and return it with an id', async () => {
      const preChats = await prisma.chat.findMany();
      expect(preChats.length).toBe(0);
      const { body } = await request(server)
        .post('/chat')
        .set('Authorization', 'Bearer ' + testToken)
        .expect('Content-Type', /json/)
        .send(mockAddChat)
        .expect(200);
      const chat = body.data;
      expect(chat).toHaveProperty('id');
      expect(chat).toHaveProperty('createdAt');
      expect(chat).toHaveProperty('updatedAt');
      expect(chat.buyerId).toBe(mockAddChat.buyerId);
      expect(chat.sellerId).toBe(mockAddChat.sellerId);
      expect(chat.listingId).toBe(mockAddChat.listingId);
    });

    it('Should only let authenticated users create a chat', async () => {
      const preChats = await prisma.chat.findMany();
      expect(preChats.length).toBe(0);
      const { body } = await request(server)
        .post('/chat')
        .expect('Content-Type', /json/)
        .send(mockAddChat)
        .expect(401);
      const chat = body.data;
      expect(chat).toBe(undefined);
      expect(body).toHaveProperty('error');
      const postChats = await prisma.chat.findMany();
      expect(postChats.length).toBe(0);
    });
  });
};
