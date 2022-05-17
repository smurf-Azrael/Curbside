import { prisma } from '../prisma/client';

export const addFavorite = async (userId: string, listingId: string): Promise<any> => {
  const dbUser: any = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      favorites: {
        connect: [{ id: listingId }]
      }
    },
    include: {
      favorites: true
    }
  });
  const userFavoritesPackage = { user: dbUser.id, favorites: dbUser.favorites };
  return userFavoritesPackage;
};

export const getFavorites = async (userId: string): Promise<any> => {
  const dbUser: any = await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      favorites: true
    }
  });
  console.log('dbUser', dbUser);
  const userFavoritesPackage = { user: dbUser.id, favorites: dbUser.favorites };
  return userFavoritesPackage;
};

export default {
  addFavorite,
  getFavorites
  // deleteFavorites
};
