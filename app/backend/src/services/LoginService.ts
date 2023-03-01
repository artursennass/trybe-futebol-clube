import { IUser } from '../interfaces/UserInterface';
// import { ILogin } from '../interfaces/LoginInterface';
import Users from '../database/models/UserModel';

export default class LoginService {
  public loginCheck = async (email: string): Promise<IUser | null> => {
    const user = await Users.findOne({
      where: { email },
    });

    return user;
  };

  public getUser = async (email: string, password: string): Promise<IUser> => {
    const user = await Users.findOne({
      where: { email, password },
      attributes: { exclude: ['password'] },
    });

    if (user) return user;
    return {
      username: 'string',
      role: 'string',
      email: 'string',
    };
  };
}
