import { User } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';
import { UsersDTO } from '../interfaces/users.interface.dto';
import { prisma } from '../prisma/client';

export const createInitialUser = async (userDetails: UsersDTO): Promise<IUser> => {
  const dbUser: User = await prisma.user.create({ data: userDetails });
  const user: IUser = { id: dbUser.id, email: dbUser.email, emailVerified: dbUser.emailVerified, createdAt: dbUser.createdAt };
  return user;
};
export default {
  createInitialUser
};
