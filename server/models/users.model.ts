import { IUser } from '../interfaces/user.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import userQueries from '../queries/userQueries';

const addInitialUser = async (userDetails: InitialUserDTO): Promise<IUser> => {
  const dbUser: IUser = await userQueries.createInitialUser(userDetails);
  return dbUser;
};
const finalizeUser = async (userId: string, userDetails: FinalizeUserDTO): Promise<IUser> => {
  const dbUser: IUser = await userQueries.finalizeUser(userId, userDetails);
  return dbUser;
};

export default {
  addInitialUser,
  finalizeUser
};
