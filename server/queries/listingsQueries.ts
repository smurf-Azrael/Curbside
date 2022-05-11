import { Listing, ListingCondition, Tag } from '@prisma/client';
import { GetListingQueryParams } from '../controllers/listings.controller';
import { CustomError } from '../errors/CustomError.class';
import { LISTING_PARSING_ERROR } from '../errors/SharedErrorMessages';
import { IListing, IListingCondition } from '../interfaces/listing.interface';
import { AddListingDTO } from '../interfaces/listings.interface.dto';
import { ITag } from '../interfaces/tag.interface';
import { prisma } from '../prisma/client';

const convertDataBaseListingToListing = (dbListing: Listing & {tags?: Tag[]}): IListing => {
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
      status: dbListing.status,
      createdAt: dbListing.createdAt,
      tags: !dbListing.tags ? [] : dbListing.tags.map<ITag>((tag: Tag) => ({ id: tag.id, title: tag.title }))
    };
    return listing;
  } catch (error) {
    throw new CustomError(LISTING_PARSING_ERROR, 400);
  }
};

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
  const listing: IListing = convertDataBaseListingToListing(dbListing);
  return listing;
};

export const spatialQuery = async (longitude: number, latitude: number, radius:number): Promise<{id: string}[]> => {
  const rawQueryRes = await prisma.$queryRaw<{id: string}[]>`SELECT id FROM "Listing" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radius} *1000)` as any;
  return rawQueryRes;
};

export const spatialQueryListings = async (spatialQueryRes: {id:string}[], queryParams: GetListingQueryParams): Promise<any> => {
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
        }
      ]
    },
    orderBy: { // sortBy
      createdAt: queryParams.sortBy === 'newset' ? 'desc' : undefined,
      priceInCents: queryParams.sortBy === 'price desc' ? 'desc' : queryParams.sortBy === 'price asc' ? 'asc' : undefined
    },
    include: {
      tags: true
    }
  });
  return dbListings.map(convertDataBaseListingToListing);
};

export const getListingsByUserId = async (userId: string):Promise<IListing[]> => {
  const dbListings = await prisma.listing.findMany({
    where: {
      userId
    }
  });
  const listings = dbListings.map(convertDataBaseListingToListing);
  return listings;
};

export default {
  createListing,
  spatialQuery,
  spatialQueryListings,
  getListingsByUserId
};
