import { User } from '@prisma/client';
import { CustomError } from '../errors/CustomError.class';
import { USER_PARSING_ERROR } from '../errors/SharedErrorMessages';
import { IUser } from '../interfaces/user.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import { prisma } from '../prisma/client';

const convertDataBaseUserToUser = (dbUser: User): IUser => {
  try {
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
  } catch (error) {
    throw new CustomError(USER_PARSING_ERROR, 400);
  }
};

export const createInitialUser = async (userDetails: InitialUserDTO): Promise<IUser> => {
  const dbUser: User = await prisma.user.create({ data: userDetails });
  const user: IUser = convertDataBaseUserToUser(dbUser);
  return user;
};

export const finalizeUser = async (userId: string, userDetails: FinalizeUserDTO): Promise<IUser> => {
  const dbUser: User = await prisma.user.update({
    where: {
      id: userId
    },
    data: userDetails
  });
  const user: IUser = convertDataBaseUserToUser(dbUser);
  return user;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const dbUser = await prisma.user.findUnique({ where: { email } });
  if (!dbUser) {
    return null;
  }
  const user: IUser = convertDataBaseUserToUser(dbUser);
  return user;
};
export const getUserById = async (id: string): Promise<IUser | null> => {
  const dbUser = await prisma.user.findUnique({ where: { id } });
  if (!dbUser) {
    return null;
  }
  const user: IUser = convertDataBaseUserToUser(dbUser);
  return user;
};
export default {
  createInitialUser,
  finalizeUser,
  getUserByEmail,
  getUserById
};
