import { NextFunction, Request, Response } from 'express';
import { IListing, IListingPackage } from '../interfaces/listing.interface';
import { AddListingDTO, GetListingQueryParams } from '../interfaces/listings.interface.dto';
import listingsModel, { getListingByListingIdModel } from '../models/listings.model';

const addListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listingDetails: AddListingDTO = req.body;
    const listing = await listingsModel.addListing(listingDetails);
    res.status(200).send({ data: { listing } });
  } catch (error) {
    next(error);
  }
};

const getListings = async (req: Request<unknown, unknown, unknown, GetListingQueryParams>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const queryParams = req.query;
    // @ts-ignore
    const listings:IListing[] = await listingsModel.getListings(req.user?.uid, queryParams);
    res.status(200).send({ data: { listings, offset: +queryParams.offset + listings.length } });
  } catch (error) {
    next(error);
  }
};

export const getListingByListingId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id : string = req.params.id;
    const listing: IListingPackage | null = await getListingByListingIdModel(id);
    res.status(200).send({ data: { listing } });
  } catch (error) {
    next(error);
  }
};

export default {
  addListing,
  getListings,
  getListingByListingId
};
