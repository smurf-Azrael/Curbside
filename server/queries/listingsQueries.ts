import { Listing, ListingCondition } from '@prisma/client';
import { CustomError } from '../errors/CustomError.class';
import { LISTING_PARSING_ERROR } from '../errors/SharedErrorMessages';
import { IListing, IListingCondition } from '../interfaces/listing.interface';
import { AddListingDTO } from '../interfaces/listings.interface.dto';
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
      status: dbListing.status,
      createdAt: dbListing.createdAt
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

export const spatialQuery = async (longitude: number, latitude: number, radius:number): Promise<any> => {
  const rawQueryRes = await prisma.$queryRaw<{id: string}[]>`SELECT id FROM "Listing" WHERE ST_DWithin(ST_MakePoint(longitude, latitude), ST_MakePoint(${longitude}, ${latitude})::geography, ${radius} *1000)` as any;
  return rawQueryRes;
};

export const spatialQueryListings = async (spatialQueryRes: any): Promise<any> => {
  const dbListings = await prisma.listing.findMany({
    where: {
      id: {
        in: spatialQueryRes.map(({ id }: {id:string}) => id)
      }
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
