import { CustomError } from '../errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../errors/ErrorMessages';
import { IUser } from '../interfaces/user.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';
import userQueries from '../queries/userQueries';
import { addInitialUserInputValidation, finalizeUserInputValidation, usersModelErrorMessages } from './users.model.validation';

const addInitialUser = async (userDetails: InitialUserDTO): Promise<IUser> => {
  try {
    addInitialUserInputValidation(userDetails);
    // check if email already in use
    const userDoesNotExist = await userQueries.getUserByEmail(userDetails.email);
    if (userDoesNotExist !== null) {
      throw new CustomError(usersModelErrorMessages.emailExists, 400);
    }
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
    finalizeUserInputValidation(userDetails);
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
