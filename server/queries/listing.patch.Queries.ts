import { Listing } from '@prisma/client';
import { IListing } from '../interfaces/listing.interface';
import { FinalizeListingDTO } from '../interfaces/listings.interface.dto';
import { prisma } from '../prisma/client';
import { convertDataBaseListingToListing } from './query-helpers/converter.helpers';

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
