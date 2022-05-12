import { IListingCondition } from './listing.interface';

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

export interface GetListingQueryParams {
  offset: string,
  radius: string,
  tags?: string,
  maxPrice?: string,
  minPrice: string,
  sortBy: string,
  condition: string,
  longitude?:string,
  latitude?:string,
  search?:string,
}
