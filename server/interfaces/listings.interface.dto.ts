import { IListingCondition, IListingStatus } from './listing.interface';

export interface AddListingDTO {
  userId: string,
  title: string,
  description: string,
  priceInCents: number,
  currency: string,
  condition: IListingCondition,
  photoUrls: string, // JSON array
  longitude: number,
  latitude: number,
}

export interface FinalizeListingDTO {
  title: string,
  description: string,
  priceInCents: number,
  condition: IListingCondition,
  photoUrls: string, // JSON array
  longitude: number,
  latitude: number,
  status: IListingStatus
}
