import { Listing } from '@prisma/client';
import { CustomError } from '../errors/CustomError.class';
import { LISTING_PARSING_ERROR, USER_NOT_FOUND } from '../errors/SharedErrorMessages';
import { IListing, IListingCondition, IListingStatus } from '../interfaces/listing.interface';
import { IUserInfoSelect } from '../interfaces/user.interface';
import { prisma } from '../prisma/client';

interface IdbSelectUserDetails{
  firstName: string| null,
  lastName: string| null,
  photoUrl: string | null
}

const convertDBSelectUserDetailsToDetails = (dbSelectUserDetails: IdbSelectUserDetails): IUserInfoSelect => {
  const reformatedSelectUserDetails = {
    userFirstName: dbSelectUserDetails.firstName!,
    userLastName: dbSelectUserDetails.lastName!,
    userPhotoUrl: dbSelectUserDetails.photoUrl
  };
  return reformatedSelectUserDetails;
};

const convertDataBaseListingToListing = (dbListing: Listing): IListing => {
  try {
    const listing: IListing = {
      id: dbListing.id,
      userId: dbListing.userId,
      title: dbListing.title,
      description: dbListing.description,
      priceInCents: dbListing.priceInCents,
      currency: dbListing.currency,
      condition: dbListing.condition === 'new'
        ? IListingCondition.new
        : dbListing.condition === 'gentlyUsed'
          ? IListingCondition.gentlyUsed
          : IListingCondition.used,
      photoUrls: dbListing.photoUrls,
      longitude: dbListing.longitude,
      latitude: dbListing.latitude,
      status: dbListing.status === 'available'
        ? IListingStatus.available
        : dbListing.status === 'reserved'
          ? IListingStatus.reserved
          : IListingStatus.sold,
      createdAt: dbListing.createdAt
    };
    return listing;
  } catch (error) {
    throw new CustomError(LISTING_PARSING_ERROR, 400);
  }
};

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
