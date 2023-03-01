import * as express from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';
import ValidateToken, { RequestEspecial } from '../middleware/validateToken';

const LoginRouter = express.Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

LoginRouter.post('/', loginController.login);

LoginRouter.get(
  '/role',
  (req, res, next) => ValidateToken.validation(req as RequestEspecial, res, next),
  (req, res) => loginController.roleCheck(req as RequestEspecial, res),
);

export default LoginRouter;
