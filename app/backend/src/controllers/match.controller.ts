import { Request, Response } from 'express';
import Auth from '../services/auth.service';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService, private authService: Auth) {}

  // async list(_req: Request, res: Response): Promise<void> {
  //   const result = await this.matchService.list();
  //   res.status(200).json(result);
  // }

  async getByQueryAndAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const result = await this.matchService.list();
      res.status(200).json(result);
    }
    const result = await this.matchService.getByQuery(String(inProgress));
    res.status(200).json(result);
  }

  async updatedMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchService.updatedMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { authorization } = req.headers;
    await this.authService.loginValidate(String(authorization));

    const newMatch = await this.matchService.create(req.body);
    res.status(201).json(newMatch);
  }
}
