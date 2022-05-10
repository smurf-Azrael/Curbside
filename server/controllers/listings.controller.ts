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

interface GetListingQueryParams {
  offset: string,
  radius: string,
  tags?: string,
  maxPrice?: string,
  minPrice: string,
  sortBy: string,
  condition: string
}

const getListings = async (req: Request<unknown, unknown, unknown, GetListingQueryParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const queryParams = req.query;
    console.log(queryParams);
    // const listings:IListing[] = await listingsModel.getListings();
    res.status(200).send({ hello: 'world' });
    // res.status(200).send({ listings });
  } catch (error) {
    next(error);
  }
};

export default {
  addListing,
  getListings
};
