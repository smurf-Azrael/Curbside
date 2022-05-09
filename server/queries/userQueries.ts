import { User } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import { prisma } from '../prisma/client';

export const createInitialUser = async (userDetails: InitialUserDTO): Promise<IUser> => {
  const dbUser: User = await prisma.user.create({ data: userDetails });
  const user: IUser = { id: dbUser.id, email: dbUser.email, emailVerified: dbUser.emailVerified, createdAt: dbUser.createdAt };
  return user;
};

export const finalizeUser = async (userId: string, userDetails: FinalizeUserDTO): Promise<IUser> => {
  const dbUser: User = await prisma.user.update({
    where: {
      id: userId
    },
    data: userDetails
  });
  const user: IUser = {
    id: dbUser.id,
    email: dbUser.email,
    emailVerified: dbUser.emailVerified,
    createdAt: dbUser.createdAt,
    city: dbUser.city ?? undefined,
    firstName: dbUser.firstName ?? undefined,
    lastName: dbUser.lastName ?? undefined,
    latitude: dbUser.latitude ?? undefined,
    longitude: dbUser.longitude ?? undefined,
    photoUrl: dbUser.photoUrl ?? undefined
  };
  return user;
};
export default {
  createInitialUser,
  finalizeUser
};
