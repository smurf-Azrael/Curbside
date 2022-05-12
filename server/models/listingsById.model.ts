// import { IListing, IListingCondition, IListingStatus } from '../interfaces/listing.interface';
// import { CustomError } from '../errors/CustomError.class';
// import { LISTING_NOT_FOUND } from '../errors/SharedErrorMessages';
// import { getListingsByListingId, getSelectUserInfoByUserId, getUserRatingByUserId } from '../queries/listingByIdQueries';

// interface IListingPackage{
//   id: string,
//   userId: string,
//   title: string,
//   description: string,
//   priceInCents: number,
//   currency: string,
//   condition: IListingCondition,
//   photoUrls: string[],
//   longitude: number,
//   latitude: number,
//   status: IListingStatus,
//   createdAt: Date,
//   userFirstName: string,
//   userLastName: string
//   userPhotoUrl: string | null,
//   rating: number
// }

// export interface IUserInfoSelect{
//   userFirstName: string,
//   userLastName: string,
//   userPhotoUrl: string | null
// }

// export const getListingByListingIdModel = async (id:string) : Promise<IListingPackage | null> => {
//   try {
//     const listing: IListing | null = await getListingsByListingId(id);
//     if (listing === null || undefined) { throw new CustomError(LISTING_NOT_FOUND, 404); }
//     const userInfo: IUserInfoSelect | null = await getSelectUserInfoByUserId(listing.userId);
//     const rating: number | null = await getUserRatingByUserId(listing.userId);
//     const listingPackage: IListingPackage = { ...listing, ...userInfo, rating };
//     return listingPackage;
//   } catch (error) {
//     console.log('/models/listingsById.model getListingByIdModel ERROR', error);
//     throw error;
//   }
// };
