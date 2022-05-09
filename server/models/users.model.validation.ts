import { CustomError } from '../errors/CustomError.class';
import { CustomErrorMessageObject } from '../errors/CustomErrorMessageObject.interface';
import { FinalizeUserDTO, InitialUserDTO } from '../interfaces/users.interface.dto';

export const usersModelErrorMessages = {
  noEmailVerified: 'No email-verified provided.',
  noEmail: 'No email provided.',
  wrongEmailFormat: 'Email is not the correct format.',
  emailExists: 'Email already in use.',
  invalidFirstName: 'Please enter a valid first name.',
  invalidLastName: 'Please enter a valid last name.',
  invalidCoordinate: 'Invalid location coordinates.'
};

export const addInitialUserInputValidation = (userDetails: InitialUserDTO): void => {
  const errorMessages: CustomErrorMessageObject = {};
  if (userDetails.emailVerified === undefined) {
    errorMessages.emailVerified = usersModelErrorMessages.noEmailVerified;
  }
  if (userDetails.email === undefined) {
    errorMessages.email = usersModelErrorMessages.noEmail;
  } else
  if (typeof userDetails.email !== 'string') {
    errorMessages.email = usersModelErrorMessages.wrongEmailFormat;
  } else {
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!userDetails.email.match(regex)?.length) {
      errorMessages.email = usersModelErrorMessages.wrongEmailFormat;
    }
  }
  if (Object.keys(errorMessages).length) {
    throw new CustomError(JSON.stringify(errorMessages), 400);
  }
};

export const finalizeUserInputValidation = (userDetails: FinalizeUserDTO): void => {
  const errorMessages: CustomErrorMessageObject = {};
  if (userDetails.emailVerified === undefined) {
    errorMessages.emailVerified = usersModelErrorMessages.noEmailVerified;
  }
  if (!_nameVerification(userDetails.firstName)) {
    errorMessages.firstName = usersModelErrorMessages.invalidFirstName;
  }
  if (!_nameVerification(userDetails.lastName)) {
    errorMessages.lastName = usersModelErrorMessages.invalidLastName;
  }
  if (!_coordinationVerification(userDetails.longitude)) {
    errorMessages.longitude = usersModelErrorMessages.invalidCoordinate;
  }
  if (Object.keys(errorMessages).length) {
    throw new CustomError(JSON.stringify(errorMessages), 400);
  }
};

const _nameVerification = (name: string):boolean => {
  if (typeof name !== 'string') {
    return false;
  }
  if (name.trim().length <= 0 || name.trim().length > 30) {
    return false;
  }
  return true;
};

const _coordinationVerification = (coord: number): boolean => {
  if (typeof coord !== 'number') {
    return false;
  }
  if (coord < -180 || coord > 180) {
    return false;
  }
  return true;
};
