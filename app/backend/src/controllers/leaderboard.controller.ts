import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
  ) {}

  async listHome(_req: Request, res: Response): Promise<void> {
    // const point = await this.leaderboardService.totalPoints();
    const leaderboardHome = await this.leaderboardService.leaderboardTeam();
    // const result = await this.leaderboardService.listHome(point);
    res.status(200).json(leaderboardHome);
  }
}
