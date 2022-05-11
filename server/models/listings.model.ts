import { GetListingQueryParams } from '../controllers/listings.controller';
import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { IListing } from '../interfaces/listing.interface';
import { AddListingDTO } from '../interfaces/listings.interface.dto';
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
    const listings: IListing[] = await spatialQueryListings(listingsInRangeIds, params);
    // filter for tags
    // if (params.tags !== undefined) {
    //   const tags = params.tags.split(' ');
    //   const result: IListing[] = [];
    //   for (let listing of listings){
    //     for (let tag of tags){
    //       if (listing.tag)
    //     }
    //   }
    // }
    return listings;
  } catch (error) {
    console.log('/models/users.model getListings ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};

export default {
  addListing,
  getListings
};
