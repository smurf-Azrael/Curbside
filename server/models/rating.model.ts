import { AddRatingDTO, IRating } from '../interfaces/rating.interface.dto';
import ratingsQueries from '../queries/ratingsQueries';
import { addRatingInputValidation } from './rating.model.validation';

export const addRating = async (ratingDetails: AddRatingDTO): Promise<IRating> => {
  try {
    await addRatingInputValidation(ratingDetails);
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
