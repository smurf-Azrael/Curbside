import { Listing } from '@prisma/client';
import { CustomError } from '../../errors/CustomError.class';
import { LISTING_PARSING_ERROR } from '../../errors/SharedErrorMessages';
import { IListing, IListingCondition, IListingStatus } from '../../interfaces/listing.interface';
import { IdbSelectUserDetails } from '../../interfaces/listings.interface.dto';
import { IUserInfoSelect } from '../../interfaces/user.interface';

export const convertDBSelectUserDetailsToDetails = (dbSelectUserDetails: IdbSelectUserDetails): IUserInfoSelect => {
  const reformatedSelectUserDetails = {
    userFirstName: dbSelectUserDetails.firstName!,
    userLastName: dbSelectUserDetails.lastName!,
    userPhotoUrl: dbSelectUserDetails.photoUrl
  };
  return reformatedSelectUserDetails;
};

export const convertDataBaseListingToListing = (dbListing: Listing): IListing => {
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
      createdAt: dbListing.createdAt,
      tags: dbListing.tags
    };
    return listing;
  } catch (error) {
    throw new CustomError(LISTING_PARSING_ERROR, 400);
  }
};
