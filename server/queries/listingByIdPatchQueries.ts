import { Listing } from '@prisma/client';
import { CustomError } from '../errors/CustomError.class';
import { LISTING_PARSING_ERROR } from '../errors/SharedErrorMessages';
import { IListing, IListingCondition, IListingStatus } from '../interfaces/listing.interface';
import { FinalizeListingDTO } from '../interfaces/listings.interface.dto';
import { prisma } from '../prisma/client';

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
      createdAt: dbListing.createdAt,
      tags: dbListing.tags
    };
    return listing;
  } catch (err) {
    throw new CustomError(LISTING_PARSING_ERROR, 400);
  }
};

export const updateListingQuery = async (listingId:string, listingDetails:FinalizeListingDTO): Promise<IListing> => {
  const dbListing: Listing = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: listingDetails
  });
  const listing: IListing = convertDataBaseListingToListing(dbListing);
  return listing;
};
