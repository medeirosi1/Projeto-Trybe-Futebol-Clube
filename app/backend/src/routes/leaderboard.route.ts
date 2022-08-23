import { Router } from 'express';
import AwayLeaderboardService from '../services/awayLeaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardController = new LeaderboardController(
  new LeaderboardService(),
  new AwayLeaderboardService(),
);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.listHome(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.listaway(req, res));
// leaderboardRouter.patch('/:id', (req, res) => matchController.matchUpdated(req, res));

export default leaderboardRouter;
