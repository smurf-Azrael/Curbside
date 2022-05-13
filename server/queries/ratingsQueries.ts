import { AddRatingDTO, IRating } from '../interfaces/rating.interface.dto';
import { prisma } from '../prisma/client';

export const createRating = async (ratingDetails :AddRatingDTO): Promise<IRating> => {
  const dbRating = await prisma.rating.create({
    data: {
      ...ratingDetails
    }
  });
  return dbRating;
};

export default {
  createRating

};
