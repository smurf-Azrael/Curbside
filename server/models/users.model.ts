import { IUser } from '../interfaces/user.interface';
import { UsersDTO } from '../interfaces/users.interface.dto';
import userQueries from '../queries/userQueries';
export const usersModel = async (userDetails: UsersDTO): Promise<IUser> => {
  const dbUser: IUser = await userQueries.createInitialUser(userDetails);
  return dbUser;
};
