import { IListing, IListingCondition } from '../interfaces/listing.interface';
import { CustomError } from '../errors/CustomError.class';
import { LISTING_NOT_FOUND, UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { getListingsByListingId, getUserPhotoByUserId, getUserRatingByUserId } from '../queries/listingByIdQueries';

interface IListingPackage{
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
  status: string,
  createdAt: Date,
  userPhotoUrl: string,
  rating: number
}

export const getListingByListingIdModel = async (id:string) : Promise<IListingPackage | null> => {
  try {
    const listing: IListing | null = await getListingsByListingId(id);
    if (listing === null || undefined) { throw new CustomError(LISTING_NOT_FOUND, 404); }
    const userPhotoUrl: string | null = await getUserPhotoByUserId(listing.userId);
    const rating: number | null = await getUserRatingByUserId(listing.userId);
    const listingPackage: IListingPackage = { ...listing, userPhotoUrl, rating };
    return listingPackage;
  } catch (error) {
    console.log('/models/listingsById.model getListingByIdModel ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};
