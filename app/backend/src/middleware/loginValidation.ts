import * as joi from 'joi';
import { ILogin } from '../interfaces/LoginInterface';

export default class LoginValidation {
  static joiValidation(user: ILogin) {
    const checkUser = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    }).required().messages({
      'string.empty': 'All fields must be filled',
      'string.email': 'Invalid email or password',
      'string.min': 'Invalid email or password',
    });

    const { error } = checkUser.validate(user);

    return error;
  }
}
