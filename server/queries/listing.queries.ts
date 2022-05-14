import { Listing, ListingCondition } from '@prisma/client';
import { IListing, IListingCondition } from '../interfaces/listing.interface';
import { AddListingDTO, FinalizeListingDTO, GetListingQueryParams } from '../interfaces/listing.interface.dto';
import { prisma } from '../prisma/client';
import converterHelpers from './query-helpers/converter.helpers';

export const createListing = async (listingDetails: AddListingDTO): Promise<IListing> => {
  const dbListing: Listing = await prisma.listing.create({
    data: {
      ...listingDetails,
      condition: listingDetails.condition === IListingCondition.new
        ? ListingCondition.new
        : listingDetails.condition === IListingCondition.gentlyUsed
          ? ListingCondition.gentlyUsed
          : ListingCondition.used
    }
  });
  const listing: IListing = converterHelpers.convertDataBaseListingToListing(dbListing);
  return listing;
};

export const getIdsInRadius = async (longitude: number, latitude: number, radius:number): Promise<{id: string}[]> => {
  const rawQueryRes = await prisma.$queryRaw<{id: string}[]>`SELECT id FROM "Listing" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radius} *1000)` as any;
  return rawQueryRes;
};

export const getListingsInRadius = async (spatialQueryRes: {id:string}[], queryParams: GetListingQueryParams): Promise<any> => {
  const dbListings = await prisma.listing.findMany({
    where: {
      AND: [
        {
          id: {
            in: spatialQueryRes.map(({ id }: {id:string}) => id)
          }
        },
        {
          priceInCents: {
            gte: +queryParams.minPrice, // minPrice
            lte: queryParams.maxPrice ? +queryParams.maxPrice : 10000000 // maxPrice
          }
        },
        {
          OR:
          [
            {
              condition: {
                in: queryParams.condition === 'all' ? ['gentlyUsed', 'new', 'used'] : undefined
              }
            },
            {
              condition: {
                equals: queryParams.condition === 'gently used'
                  ? 'gentlyUsed'
                  : queryParams.condition === 'new'
                    ? 'new'
                    : queryParams.condition === 'used'
                      ? 'used'
                      : undefined
              }
            }
          ]
        },
        {
          tags: {
            search: queryParams.tags ? queryParams.tags.split(' ').join(' | ') : undefined
          }
        },
        {
          OR: [
            {
              title: {
                search: queryParams.search ? queryParams.search.split(' ').join(' | ') : undefined
              }
            },
            {
              description: { search: queryParams.search ? queryParams.search.split(' ').join(' | ') : undefined }
            }
          ]
        }
      ]
    },
    orderBy: { // sortBy
      createdAt: queryParams.sortBy === 'newest' ? 'desc' : undefined,
      priceInCents: queryParams.sortBy === 'price desc' ? 'desc' : queryParams.sortBy === 'price asc' ? 'asc' : undefined
    }

  });
  return dbListings.map(converterHelpers.convertDataBaseListingToListing);
};

export const getListingsByUserId = async (userId: string):Promise<IListing[]> => {
  const dbListings = await prisma.listing.findMany({
    where: {
      userId
    }
  });
  const listings = dbListings.map(converterHelpers.convertDataBaseListingToListing);
  return listings;
};

export const getListings = async (id: string):Promise<IListing | null> => {
  const dbListing : Listing | null = await prisma.listing.findFirst({
    where: {
      id
    }
  });
  const listings = dbListing ? (converterHelpers.convertDataBaseListingToListing(dbListing)) : dbListing;
  console.log('listings', listings);
  return listings;
};

export const updateListing = async (listingId:string, listingDetails:FinalizeListingDTO): Promise<IListing> => {
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
  createListing,
  getIdsInRadius,
  getListingsInRadius,
  getListingsByUserId,
  getListings,
  updateListing
};
