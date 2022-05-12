import { IListingStatus } from './listing.interface';

export interface IChat {
  id: string,
  sellerId: string,
  buyerId: string,
  listingId: string,
  listingPhotoUrl?: string,
  listingStatus: IListingStatus,
  priceInCents: number,
  currency: string,
}
