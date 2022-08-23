// const objExample = {
//   name: 'Santos',
//   totalPoints: 9,
//   totalGames: 3,
//   totalVictories: 3,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: 9,
//   goalsOwn: 3,
//   goalsBalance: 6,
//   efficiency: '100.00',
// };

import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { TeamMatchHome } from '../interfaces/IMatch';
import homeLeaderboard from './utils';

export default class LeaderboardService {
  listHome = (points: number[]) => points;

  homeTeams = async (): Promise<TeamMatchHome[]> => {
    const matchall = await Team.findAll(
      { include: [{ model: Match, as: 'homeMatch', where: { inProgress: false } }] },
    );
    return matchall as unknown as TeamMatchHome[];
  };

  async leaderboardHomeTeam() {
    const teamHome = await this.homeTeams();
    const leaderboard = teamHome.map((home) => ({
      name: home.teamName,
      totalPoints: homeLeaderboard.totalPoints(home.homeMatch),
      totalGames: homeLeaderboard.totalGames(home.homeMatch),
      totalVictories: homeLeaderboard.totalVictories(home.homeMatch),
      totalDraws: homeLeaderboard.totalDraws(home.homeMatch),
      totalLosses: homeLeaderboard.totalLosses(home.homeMatch),
      goalsFavor: homeLeaderboard.goalsFavor(home.homeMatch),
      goalsOwn: homeLeaderboard.goalsOwn(home.homeMatch),
      goalsBalance: homeLeaderboard.goalsBalance(home.homeMatch),
      efficiency: homeLeaderboard.efficiency(home.homeMatch),
    }));
    return leaderboard.sort((acc, curr) => curr.totalPoints - acc.totalPoints
    || curr.totalVictories - acc.totalVictories
    || curr.goalsBalance - acc.goalsBalance
    || curr.goalsFavor - acc.goalsFavor
    || curr.goalsOwn - acc.goalsOwn);
  }
}
