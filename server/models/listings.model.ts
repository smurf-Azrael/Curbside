import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { IListing } from '../interfaces/listing.interface';
import { AddListingDTO, GetListingQueryParams } from '../interfaces/listings.interface.dto';
import { ITag } from '../interfaces/tag.interface';
import listingsQueries, { spatialQuery, spatialQueryListings } from '../queries/listingsQueries';
import { getUserById } from '../queries/userQueries';
import { addListingInputValidation } from './listings.model.validation';
const addListing = async (listingDetails: AddListingDTO): Promise<IListing> => {
  try {
    await addListingInputValidation(listingDetails);
    const listing: IListing = await listingsQueries.createListing(listingDetails);
    return listing;
  } catch (error) {
    console.log('/models/listings.model addListing ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};

const getListings = async (userId: string | undefined, params: GetListingQueryParams): Promise<any> => {
  try {
    let long:number|undefined, lat:number|undefined;
    // if coords are passed in then use those values for the query
    if (params.longitude !== undefined && params.latitude !== undefined) {
      long = +params.longitude;
      lat = +params.latitude;
    } else {
      // if long lat are not given
      //    => grab them from the logged in user
      if (userId !== undefined) {
        const user = await getUserById(userId);

        if (user && user.longitude && user.latitude) {
          long = user.longitude;
          lat = user.latitude;
        }
      }
      if (long === undefined || lat === undefined) {
        // if no user is logged in
        //    => grab it from the ip
        // if not possible
        //    => add default berlin coordinates
        long = 52.5200;
        lat = 13.4050;
      }
    }
    const listingsInRangeIds: {id: string}[] = await spatialQuery(long, lat, +params.radius);
    let listings: IListing[] = await spatialQueryListings(listingsInRangeIds, params);
    // filter for tags
    if (params.tags !== undefined) {
      const tags = params.tags.split(' ');
      const result: IListing[] = [];
      for (const listing of listings) {
        for (const tag of tags) {
          // if tag is included in listing.tags
          //    push to result and continue
          if (listing.tags?.map<string>((listingsTag: ITag) => listingsTag.title).includes(tag)) {
            result.push(listing);
            continue;
          }
        }
      }
      listings = result;
    }
    // sort by closest
    if (params.sortBy === 'closest') {
      const sortedByDistanceListings = [...listings]
        .sort((a, b) =>
          getDistance([a.longitude, a.latitude], [long!, lat!]) -
           getDistance([b.longitude, b.latitude], [long!, lat!])
        );
      listings = sortedByDistanceListings;
    }
    //  skip offset
    return listings.slice(+params.offset);
  } catch (error) {
    console.log('/models/users.model getListings ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};
export const getDistance = (start: number[], end: number[]): number => {
  const xDistance = start[0] - end[0];
  const yDistance = start[1] - end[1];
  const sqx = xDistance * xDistance;
  const sqy = yDistance * yDistance;
  const distSum = sqx + sqy;
  const sqrtDist = Math.sqrt(distSum);
  return sqrtDist;
};
export default {
  addListing,
  getListings
};
