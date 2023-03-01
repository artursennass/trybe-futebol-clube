// import * as jwt from 'jsonwebtoken';
// import { NextFunction, Request, Response } from 'express';
// import 'dotenv/config';
// import { IUser } from '../interfaces/UserInterface';
// import connection from '../models/connection';

// const secret = process.env.JWT_SECRET || 'senhaSuperSecreta';

// const checkUsername = async (username: string): Promise<IUser[]> => {
//   const query = 'SELECT * FROM Trybesmith.users WHERE Trybesmith.users.username = ?';
//   const [result] = await connection.execute(query, [username]);
//   return result as IUser[];
// };

// export interface RequestEspecial extends Request {
//   user: number;
// }

// export default async (req: RequestEspecial, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(401).json({ message: 'Token not found' });
//   }

//   try {
//     const decoded = jwt.verify(token, secret);

//     let user;

//     if (typeof decoded !== 'string') {
//       user = await checkUsername(decoded.data.username);
//       req.user = decoded.data.id;
//     }

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };
