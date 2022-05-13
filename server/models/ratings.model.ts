import { AddRatingDTO, IRating } from '../interfaces/rating.interface.dto';
import ratingsQueries from '../queries/ratingsQueries';

export const addRating = async (ratingDetails: AddRatingDTO): Promise<IRating> => {
  try {
    const rating: IRating = await ratingsQueries.createRating(ratingDetails);
    return rating;
  } catch (error) {
    console.log('/models/listings.model addListing ERROR', error);
    throw error;
  }
};

export default {
  addRating
};
