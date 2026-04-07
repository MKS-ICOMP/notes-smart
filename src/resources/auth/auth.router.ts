import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import { authRateLimit } from '../../middlewares/rateLimit';
import validateBody from '../../middlewares/validateBody';
import {
  loginController,
  logoutController,
  signUpController,
} from './auth.controller';
import { loginSchema, signUpSchema } from './auth.schema';

const authRouter = Router();

authRouter.use(authRateLimit);

authRouter.post('/signup', validateBody(signUpSchema), signUpController);
authRouter.post('/login', validateBody(loginSchema), loginController);
authRouter.post('/logout', isAuth, logoutController);

export default authRouter;
