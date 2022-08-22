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
import homeTeam from '../interfaces/ILeaderboard';

export default class LeaderboardService {
  listHome = (points: number[]) => points;

  homeTeams = async (): Promise<TeamMatchHome[]> => {
    const matchall = await Team.findAll(
      { include: [{ model: Match, as: 'homeMatch', where: { inProgress: false } }] },
    );
    return matchall as unknown as TeamMatchHome[];
  };

  async leaderboardTeam() {
    const teamHome = await this.homeTeams();
    const leaderboard = teamHome.map((home) => ({
      name: home.teamName,
      totalPoints: this.totalPoints(home.homeMatch),
      totalGames: this.totalGames(home.homeMatch),
      totalVictories: this.totalVictories(home.homeMatch),
      totalDraws: this.totalDraws(home.homeMatch),
      totalLosses: this.totalLosses(home.homeMatch),
      goalsFavor: this.goalsFavor(home.homeMatch),
      goalsOwn: this.goalsOwn(home.homeMatch),
      goalsBalance: this.goalsBalance(home.homeMatch),
      efficiency: this.efficiency(home.homeMatch),
    }));
    return leaderboard.sort((acc, curr) => curr.totalPoints - acc.totalPoints
    || curr.totalVictories - acc.totalVictories
    || curr.goalsBalance - acc.goalsBalance
    || curr.goalsFavor - acc.goalsFavor
    || curr.goalsOwn - acc.goalsOwn);
  }

  totalGames = (home: homeTeam[]) => home.length;

  totalPoints = (home: homeTeam[]) => {
    const totalPoints = this.totalVictories(home) * 3 + this.totalDraws(home);
    return totalPoints;
  };

  totalVictories = (home: homeTeam[]) => {
    const vitorias = home.map((el) => {
      let count = 0;
      if (el.homeTeamGoals > el.awayTeamGoals) {
        count += 1;
      }
      return count;
    });
    return vitorias.reduce((acc, curr) => acc + curr, 0);
  };

  totalDraws = (home: homeTeam[]) => {
    const draws = home.map((el) => {
      let count = 0;
      if (el.homeTeamGoals === el.awayTeamGoals) {
        count += 1;
      }
      return count;
    });
    return draws.reduce((acc, curr) => acc + curr, 0);
  };

  totalLosses = (home: homeTeam[]) => {
    const losses = home.map((el) => {
      let count = 0;
      if (el.homeTeamGoals < el.awayTeamGoals) {
        count += 1;
      }
      return count;
    });
    return losses.reduce((acc, curr) => acc + curr, 0);
  };

  goalsFavor = (home: homeTeam[]) => {
    const goals = home.map((el) => {
      let count = 0;
      count += el.homeTeamGoals;
      return count;
    });
    return goals.reduce((acc, curr) => acc + curr, 0);
  };

  goalsOwn = (home: homeTeam[]) => {
    const goals = home.map((el) => {
      let count = 0;
      count += el.awayTeamGoals;
      return count;
    });
    return goals.reduce((acc, curr) => acc + curr, 0);
  };

  goalsBalance = (home: homeTeam[]) => {
    const balance = this.goalsFavor(home) - this.goalsOwn(home);
    return balance;
  };

  efficiency = (home: homeTeam[]) => {
    const efficiency = (this.totalPoints(home) / (this.totalGames(home) * 3)) * 100;
    return efficiency.toFixed(2);
  };
}
