import { IListingStatus } from './listing.interface';
import { IMessage } from './message.interface';

export interface IChat {
  id: string,
  sellerId: string,
  buyerId: string,
  listingId: string,
  listingPhotoUrl?: string,
  listingStatus: IListingStatus,
  priceInCents: number,
  currency: string,
  lastMessage: IMessage,
  createdAt: Date,
  updatedAt: Date
}
