import * as express from 'express';
import LoginService from '../services/LoginService';
import LoginController from '../controllers/LoginController';

const LoginRouter = express.Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

LoginRouter.post('/', loginController.login);

export default LoginRouter;
