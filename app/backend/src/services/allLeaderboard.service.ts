import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { AllTeamMatch } from '../interfaces/IMatch';
import { allLeaderboard } from './utils';

export default class AllLeaderboardService {
  allTeams = async (): Promise<AllTeamMatch[]> => {
    const matchall = await Team.findAll(
      { include: [
        { model: Match, as: 'homeMatch', where: { inProgress: false } },
        { model: Match, as: 'awayMatch', where: { inProgress: false } },
      ] },
    );
    return matchall as unknown as AllTeamMatch[];
  };

  async leaderboardAll() {
    const teamHome = await this.allTeams();
    const leaderboard = teamHome.map((home) => ({
      name: home.teamName,
      totalPoints: allLeaderboard.totalPoints(home.homeMatch, home.awayMatch),
      totalGames: allLeaderboard.totalGames(home.homeMatch, home.awayMatch),
      totalVictories: allLeaderboard.totalVictories(home.homeMatch, home.awayMatch),
      totalDraws: allLeaderboard.totalDraws(home.homeMatch, home.awayMatch),
      totalLosses: allLeaderboard.totalLosses(home.homeMatch, home.awayMatch),
      goalsFavor: allLeaderboard.goalsFavor(home.homeMatch, home.awayMatch),
      goalsOwn: allLeaderboard.goalsOwn(home.homeMatch, home.awayMatch),
      goalsBalance: allLeaderboard.goalsBalance(home.homeMatch, home.awayMatch),
      efficiency: allLeaderboard.efficiency(home.homeMatch, home.awayMatch),
    }));
    return leaderboard.sort((acc, curr) => curr.totalPoints - acc.totalPoints
    || curr.totalVictories - acc.totalVictories
    || curr.goalsBalance - acc.goalsBalance
    || curr.goalsFavor - acc.goalsFavor
    || curr.goalsOwn - acc.goalsOwn);
  }
}
