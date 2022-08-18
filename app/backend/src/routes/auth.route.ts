import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import Auth from '../services/auth.service';

const authController = new AuthController(new Auth());

const authRouter = Router();

authRouter.post('/', (req, res) => authController.login(req, res));

export default authRouter;
