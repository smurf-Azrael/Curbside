import { FavoriteDTO } from '../interfaces/favorite.dto';
import favoriteQueries from '../queries/favorite.queries';

const addFavorite = async (userId: string, favorites: string): Promise<FavoriteDTO | boolean> => {
  try {
    const favorite: any = await favoriteQueries.addFavorite(userId, favorites);
    console.log('=========favorite', favorite);
    return favorite;
  } catch (error) {
    console.log('/models/user.model addFavorite ERROR', error);
    throw error;
  }
};

export default {
  addFavorite
};
