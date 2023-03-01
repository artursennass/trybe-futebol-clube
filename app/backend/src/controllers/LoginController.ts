import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import GenerateToken from '../middleware/generateToken';
import LoginValidation from '../middleware/loginValidation';
import LoginService from '../services/LoginService';

export default class TeamsController {
  service: LoginService;

  constructor(service: LoginService) {
    this.service = service;
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const error = LoginValidation.joiValidation(req.body);
    if (error !== undefined) {
      if (error.details[0].message.includes('All fields')) {
        return res.status(400).json({ message: error.details[0].message });
      }
      return res.status(401).json({ message: error.details[0].message });
    }

    const user = await this.service.loginCheck(email);
    if (!user) { return res.status(401).json({ message: 'Invalid email or password' }); }

    let checkPassword;
    if (user.password !== undefined) {
      checkPassword = bcrypt.compareSync(password, user.password);
    }
    if (!checkPassword) return res.status(401).json({ message: 'Invalid email or password' });

    delete user.password;
    const token = GenerateToken.newToken(user);

    return res.status(200).json({ token });
  };
}
