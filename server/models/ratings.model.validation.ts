import { CustomError } from '../errors/CustomError.class';
import { CustomErrorMessageObject } from '../errors/CustomErrorMessageObject.interface';
import { AddRatingDTO } from '../interfaces/rating.interface.dto';
import { prisma } from '../prisma/client';

export const ratingModelErrorMessages = {
  invalidRating: 'Invalid Rating.',
  invalidSellerId: 'The user associated with this listing has not been found'
};

export const addRatingInputValidation = async (ratingDetails:AddRatingDTO): Promise<void> => {
  const errorMessages: CustomErrorMessageObject = {};

  if (ratingDetails.rating < 1 || ratingDetails.rating > 5) {
    errorMessages.title = ratingModelErrorMessages.invalidRating;
  }

  const user = await prisma.user.findUnique({ where: { id: ratingDetails.sellerId } });
  if (!user) {
    errorMessages.user = ratingModelErrorMessages.invalidSellerId;
  }

  if (Object.keys(errorMessages).length) {
    throw new CustomError(JSON.stringify(errorMessages), 400);
  }
};
