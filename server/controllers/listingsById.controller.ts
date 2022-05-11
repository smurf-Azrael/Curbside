import { NextFunction, Request, Response } from 'express';
import { IListing } from '../interfaces/listing.interface';
import { getListingByListingIdModel } from '../models/listingsById.model';

export const getListingByListingId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id : string = req.params.id;
    console.log('__________id', id);
    const listing: IListing | null = await getListingByListingIdModel(id);
    res.status(200).send({ listing });
  } catch (error) {
    next(error);
  }
};
