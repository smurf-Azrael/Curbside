import { Listing } from '@prisma/client';
import { CustomError } from '../errors/CustomError.class';
import { USER_NOT_FOUND } from '../errors/SharedErrorMessages';
import { IListing } from '../interfaces/listing.interface';
import { FinalizeListingDTO, IdbSelectUserDetails } from '../interfaces/listings.interface.dto';
import { IUserInfoSelect } from '../interfaces/user.interface';
import { prisma } from '../prisma/client';
import converterHelpers, { convertDataBaseListingToListing, convertDBSelectUserDetailsToDetails } from './query-helpers/converter.helpers';

export const getListingsByListingId = async (id: string):Promise<IListing | null> => {
  const dbListing : Listing | null = await prisma.listing.findFirst({
    where: {
      id
    }
  });
  const listings = dbListing ? (convertDataBaseListingToListing(dbListing)) : dbListing;
  console.log('listings', listings);
  return listings;
};

export const getSelectUserInfoByUserId = async (userId: string): Promise<IUserInfoSelect> => {
  const dbUserInfo: IdbSelectUserDetails | null = await prisma.user.findFirst({
    where: {
      id: userId
    },
    select: {
      firstName: true,
      lastName: true,
      photoUrl: true
    }

  });
  if (dbUserInfo === null || undefined) { throw new CustomError(USER_NOT_FOUND, 404); }
  return convertDBSelectUserDetailsToDetails(dbUserInfo);
};

export const getUserRatingByUserId = async (userId: string): Promise<number> => {
  const dbUserRatings: {rating:number}[] | null = await prisma.rating.findMany({
    where: {
      sellerId: userId
    },
    select: {
      rating: true
    }
  });
  // Get Average rating
  if (dbUserRatings === null || undefined) { throw new CustomError(USER_NOT_FOUND, 404); }

  const ratingArr = Object.values(dbUserRatings);
  const sum = (acc: number, obj:{rating:number}): number => (acc + obj.rating);
  const avg = ratingArr.reduce(sum, 0) / ratingArr.length;
  return avg;
};

export const updateListingQuery = async (listingId:string, listingDetails:FinalizeListingDTO): Promise<IListing> => {
  const dbListing: Listing = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: listingDetails
  });
  const listing: IListing = converterHelpers.convertDataBaseListingToListing(dbListing);
  return listing;
};

export default {
  getListingsByListingId,
  getSelectUserInfoByUserId,
  getUserRatingByUserId,
  updateListingQuery
};
