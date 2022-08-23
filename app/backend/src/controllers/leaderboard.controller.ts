import { Request, Response } from 'express';
import AllLeaderboardService from '../services/allLeaderboard.service';
import AwayLeaderboardService from '../services/awayLeaderboard.service';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService,
    private awayLeaderboardService: AwayLeaderboardService,
    private allLeaderboardService: AllLeaderboardService,
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

  async listAll(_req: Request, res: Response): Promise<void> {
    const leaderboardAll = await this.allLeaderboardService.leaderboardAll();
    res.status(200).json(leaderboardAll);
  }
}
