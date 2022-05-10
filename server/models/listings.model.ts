import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { IListing } from '../interfaces/listing.interface';
import { AddListingDTO } from '../interfaces/listings.interface.dto';
import listingsQueries, { spatialQuery, spatialQueryListings } from '../queries/listingsQueries';
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

const getListings = async (): Promise<any> => {
  try {
    const query: string[] = await spatialQuery(52.5200, 13.405, 0);
    const listings: IListing[] = await spatialQueryListings(query);
    return listings;
  } catch (error) {
    console.log('/models/users.model addInitialUser ERROR', error);
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
