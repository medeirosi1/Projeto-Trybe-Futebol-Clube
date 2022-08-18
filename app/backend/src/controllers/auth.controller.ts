import { Request, Response } from 'express';
import Auth from '../services/auth.service';

export default class AuthController {
  constructor(private authService: Auth) {}

  async login(req: Request, res: Response): Promise<void> {
    const token = await this.authService.login(req.body);
    res.status(200).json({ token });
  }
}
