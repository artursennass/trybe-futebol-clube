import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces/UserInterface';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class GenerateToken {
  static newToken(user: IUser) {
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    return token;
  }
}
