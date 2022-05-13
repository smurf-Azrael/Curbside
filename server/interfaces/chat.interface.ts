import { IListingStatus } from './listing.interface';
import { IMessage } from './message.interface';

export interface IChat {
  id: string,
  sellerId: string,
  sellerName: string,
  buyerId: string,
  buyerName: string,
  listingId: string,
  listingTitle: string,
  listingPhotoUrl?: string,
  listingStatus: IListingStatus,
  priceInCents: number,
  currency: string,
  lastMessage: IMessage,
  createdAt: Date,
  updatedAt: Date
}
