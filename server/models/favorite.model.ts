import { IUserFavoritesPackage } from '../interfaces/favorite.interface';
import favoriteQueries from '../queries/favorite.queries';

const addFavorite = async (userId: string, favorites: string): Promise<IUserFavoritesPackage> => {
  try {
    const favorite: IUserFavoritesPackage = await favoriteQueries.addFavorite(userId, favorites);
    return favorite;
  } catch (error) {
    console.log('/models/favorites.model addFavorite ERROR', error);
    throw error;
  }
};

const getFavorites = async (userId: string): Promise<IUserFavoritesPackage> => {
  try {
    const userFavoritesPackage: IUserFavoritesPackage = await favoriteQueries.getFavorites(userId);
    return userFavoritesPackage;
  } catch (error) {
    console.log('/model/favorites.model getFavorites ERROR', error);
    throw error;
  }
};

const deleteFavorite = async (userId: string, favorites: string): Promise<IUserFavoritesPackage> => {
  try {
    const deleteFavorite: IUserFavoritesPackage = await favoriteQueries.deleteFavorite(userId, favorites);
    return deleteFavorite;
  } catch (error) {
    console.log('/models/favorites.model deleteFavorite');
    throw error;
  }
};

export default {
  addFavorite,
  getFavorites,
  deleteFavorite
};
