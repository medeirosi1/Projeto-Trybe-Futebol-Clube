import { Request, Response } from 'express';
import Auth from '../services/auth.service';

export default class AuthController {
  constructor(private authService: Auth) {}

  async login(req: Request, res: Response): Promise<void> {
    const validate = this.authService.validateLogin(req.body);
    const token = await this.authService.login(validate);
    res.status(200).json({ token });
  }

  async loginValidate(req: Request, res: Response):Promise<void> {
    const token = req.headers.authorization;
    const tokenToString = String(token);
    const role = await this.authService.loginValidate(tokenToString);
    res.status(200).json({ role });
  }
}
