import { Request, Response } from 'express';
import AwayLeaderboardService from '../services/awayLeaderboard.service';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
    private awayLeaderboardService: AwayLeaderboardService,
  ) {}

  async listHome(_req: Request, res: Response): Promise<void> {
    // const point = await this.leaderboardService.totalPoints();
    const leaderboardHome = await this.leaderboardService.leaderboardHomeTeam();
    // const result = await this.leaderboardService.listHome(point);
    res.status(200).json(leaderboardHome);
  }

  async listaway(_req: Request, res: Response): Promise<void> {
    const leaderboardAway = await this.awayLeaderboardService.leaderboardTeamAway();
    res.status(200).json(leaderboardAway);
  }
}
