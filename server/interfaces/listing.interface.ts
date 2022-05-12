import { ITag } from './tag.interface';

export enum IListingCondition {
  new = 'new',
  gentlyUsed = 'gentlyUsed',
  used = 'used'
}

export enum IListingStatus{
  available = 'available',
  reserved = 'reserved',
  sold = 'sold'
}

export interface IListing {
  id: string,
  userId: string,
  title: string,
  description: string,
  priceInCents: number,
  currency: string,
  condition: IListingCondition,
  photoUrls: string[],
  longitude: number,
  latitude: number,
  status: IListingStatus,
  createdAt: Date,
  tags?: ITag[]
}
