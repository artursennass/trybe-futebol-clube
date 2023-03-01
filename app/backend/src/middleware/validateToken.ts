import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import Users from '../database/models/UserModel';
import { IUser } from '../interfaces/UserInterface';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export interface RequestEspecial extends Request {
  user: number
}

export default class ValidateToken {
  static checkEmail = async (email: string): Promise<IUser | null> => {
    const user = await Users.findOne({
      where: { email },
    });

    return user;
  };

  static validation = async (req: Request, res: Response, next: NextFunction) => {
    const request = req as RequestEspecial;
    const token = request.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const decoded = jwt.verify(token, secret);

      let user;

      if (typeof decoded !== 'string') {
        user = await ValidateToken.checkEmail(decoded.data.email);
        request.user = decoded.data.id;
      }

      if (!user) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      next();
    } catch (err) { return res.status(401).json({ message: 'Token must be a valid token' }); }
  };
}
