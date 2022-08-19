import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  async list(_req: Request, res: Response): Promise<void> {
    const result = await this.teamService.list();
    res.status(200).json(result);
  }

  async listById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.teamService.listById(Number(id));
    res.status(200).json(result);
  }
}
