import { NextFunction, Request, Response } from 'express';
import { FavoriteDTO } from '../interfaces/favorite.dto';
import favoriteModel from '../models/favorite.model';

const addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const favorites: string = req.body.favorites;
    const userFavoritesPackage : FavoriteDTO | any = await favoriteModel.addFavorite(userId, favorites);
    res.status(200).send({ data: { ...userFavoritesPackage } });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const userFavoritesPackage: any = await favoriteModel.getFavorites(userId);
    res.status(200).send({ data: { ...userFavoritesPackage } });
  } catch (error) {
    next(error);
  }
};

export default {
  addFavorite,
  getFavorites
};
