import { FavoriteDTO } from '../interfaces/favorite.dto';
import favoriteQueries from '../queries/favorite.queries';

const addFavorite = async (userId: string, favorites: string): Promise<FavoriteDTO> => {
  try {
    const favorite: any = await favoriteQueries.addFavorite(userId, favorites);
    return favorite;
  } catch (error) {
    console.log('/models/favorites.model addFavorite ERROR', error);
    throw error;
  }
};

const getFavorites = async (userId: string): Promise<FavoriteDTO> => {
  try {
    const userFavoritesPackage: any = await favoriteQueries.getFavorites(userId);
    return userFavoritesPackage;
  } catch (error) {
    console.log('/model/favorites.model getFavorites ERROR', error);
    throw error;
  }
};

const deleteFavorite = async (userId: string, favorites: string): Promise<any> => {
  try {
    const deleteFavorite: any = await favoriteQueries.deleteFavorite(userId, favorites);
    return deleteFavorite;
  } catch (error) {
    console.log('/models/favorites.model deleteFavorite');
  }
};

export default {
  addFavorite,
  getFavorites,
  deleteFavorite
};
