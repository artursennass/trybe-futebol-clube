import * as joi from 'joi';
import { ILogin } from '../interfaces/LoginInterface';

export default class LoginValidation {
  static joiValidation(user: ILogin) {
    const checkUser = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    }).required().messages({
      'string.empty': 'All fields must be filled',
    });

    const { error } = checkUser.validate(user);

    return error;
  }
}
