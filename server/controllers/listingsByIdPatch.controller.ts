import { Request, Response, NextFunction } from 'express';
import { FinalizeListingDTO } from '../interfaces/listings.interface.dto';
import { updateListing } from '../models/listingbyIdPatch.model';

export const patchListingByListingId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listingDetails: FinalizeListingDTO = req.body;
    const listingId:string = req.params.id;
    const listing = await updateListing(listingId, listingDetails);
    res.status(200).send({ data: { listing } });
  } catch (error) {
    next(error);
  }
};
