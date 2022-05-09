import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/SharedErrorMessages';
import { IUser } from '../interfaces/user.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import userQueries from '../queries/userQueries';
import { addInitialUserInputValidation, finalizeUserInputValidation } from './users.model.validation';

const addInitialUser = async (userDetails: InitialUserDTO): Promise<IUser> => {
  try {
    await addInitialUserInputValidation(userDetails);
    const user: IUser = await userQueries.createInitialUser(userDetails);
    return user;
  } catch (error) {
    console.log('/models/users.model addInitialUser ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};

const finalizeUser = async (userId: string, userDetails: FinalizeUserDTO): Promise<IUser> => {
  try {
    await finalizeUserInputValidation(userId, userDetails);
    const user: IUser = await userQueries.finalizeUser(userId, userDetails);
    return user;
  } catch (error) {
    console.log('/models/users.model finalizeUser ERROR', error);
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(UNKNOWN_SERVER_ERROR, 500);
  }
};

export default {
  addInitialUser,
  finalizeUser
};
