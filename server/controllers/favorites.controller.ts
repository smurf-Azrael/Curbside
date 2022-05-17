import { NextFunction, Request, Response } from 'express';
import { FavoriteDTO } from '../interfaces/favorite.dto';
import favoriteModel from '../models/favorite.model';

const addFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.id;
    const favorites: string = req.body.favorites;
    const { user, favoritesList } : FavoriteDTO | any = await favoriteModel.addFavorite(userId, favorites);
    res.status(200).send({ data: { user, favoritesList } });
  } catch (error) {
    next(error);
  }
};

export default {
  addFavorite
};
