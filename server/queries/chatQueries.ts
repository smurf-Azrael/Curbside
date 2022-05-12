import { ListingStatus } from '@prisma/client';
import { IChat } from '../interfaces/chat.interface';
import { IListingStatus } from '../interfaces/listing.interface';
import { prisma } from '../prisma/client';

const getChatsByUserId = async (userId: string): Promise<IChat[]> => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ sellerId: userId }, { buyerId: userId }]
    },
    include: {
      listing: {
        select: {
          title: true,
          photoUrls: true,
          status: true,
          currency: true,
          priceInCents: true
        }
      }
    }
  });
  return chats.map((chat) => ({
    id: chat.id,
    buyerId: chat.buyerId,
    currency: chat.listing.currency,
    listingId: chat.listingId,
    listingStatus: chat.listing.status === ListingStatus.available ? IListingStatus.available : chat.listing.status === ListingStatus.reserved ? IListingStatus.reserved : IListingStatus.sold,
    sellerId: chat.sellerId,
    priceInCents: chat.listing.priceInCents,
    listingPhotoUrl: chat.listing.photoUrls[0]
  }));
};

export default {
  getChatsByUserId
};
