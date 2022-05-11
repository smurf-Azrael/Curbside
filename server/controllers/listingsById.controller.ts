import { NextFunction, Request, Response } from 'express';
import { IListing } from '../interfaces/listing.interface';
import { getListingsByIdModel } from '../models/listingsById.model';

export const getListingsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } : {id:string} = req.body;
    const listing: IListing[] | null = await getListingsByIdModel(id);
    res.status(200).send({ listing });
  } catch (error) {
    next(error);
  }
};
