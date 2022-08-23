import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { TeamMatchAway } from '../interfaces/IMatch';
import { awayLeaderboard } from './utils';

export default class AwayLeaderboardService {
  awayTeams = async (): Promise<TeamMatchAway[]> => {
    const matchall = await Team.findAll(
      { include: [{ model: Match, as: 'awayMatch', where: { inProgress: false } }] },
    );
    return matchall as unknown as TeamMatchAway[];
  };

  async leaderboardTeamAway() {
    const teamHome = await this.awayTeams();
    const leaderboard = teamHome.map((away) => ({
      name: away.teamName,
      totalPoints: awayLeaderboard.totalPoints(away.awayMatch),
      totalGames: awayLeaderboard.totalGames(away.awayMatch),
      totalVictories: awayLeaderboard.totalVictories(away.awayMatch),
      totalDraws: awayLeaderboard.totalDraws(away.awayMatch),
      totalLosses: awayLeaderboard.totalLosses(away.awayMatch),
      goalsFavor: awayLeaderboard.goalsFavor(away.awayMatch),
      goalsOwn: awayLeaderboard.goalsOwn(away.awayMatch),
      goalsBalance: awayLeaderboard.goalsBalance(away.awayMatch),
      efficiency: awayLeaderboard.efficiency(away.awayMatch),
    }));
    return leaderboard.sort((acc, curr) => curr.totalPoints - acc.totalPoints
    || curr.totalVictories - acc.totalVictories
    || curr.goalsBalance - acc.goalsBalance
    || curr.goalsFavor - acc.goalsFavor
    || curr.goalsOwn - acc.goalsOwn);
  }
}
