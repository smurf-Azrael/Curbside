import { IListing } from '../interfaces/listing.interface';
import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { getListingsByUserId } from '../queries/listingsQueries';

export const getListingsByIdModel = async (id:string) : Promise<IListing[] | null> => {
  try {
    const listing: IListing[] | null = await getListingsByUserId(id);
    return listing;
  } catch (error) {
    console.log('/models/listingsById.model getListingByIdModel ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};
