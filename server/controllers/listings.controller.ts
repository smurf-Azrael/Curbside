import { NextFunction, Request, Response } from 'express';
import { IListing } from '../interfaces/listing.interface';
import { AddListingDTO } from '../interfaces/listings.interface.dto';
import listingsModel from '../models/listings.model';

const addListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listingDetails: AddListingDTO = req.body;
    const listing = await listingsModel.addListing(listingDetails);
    res.status(200).send({ listing });
  } catch (error) {
    next(error);
  }
};

const getListings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listings:IListing[] = await listingsModel.getListings();
    res.status(200).send({ listings });
  } catch (error) {
    next(error);
  }
};

export default {
  addListing,
  getListings
};
