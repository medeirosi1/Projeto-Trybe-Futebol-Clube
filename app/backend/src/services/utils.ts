import homeTeam from '../interfaces/ILeaderboard';

const homeLeaderboard = {
  totalGames: (home: homeTeam[]) => home.length,
  totalPoints: (home: homeTeam[]) => {
    const totalPoints = (
      homeLeaderboard.totalVictories(home) * 3 + homeLeaderboard.totalDraws(home));
    return totalPoints;
  },
  totalVictories: (team: homeTeam[]) => {
    const vitorias = team.map((el) => {
      let count = 0;
      if (el.homeTeamGoals > el.awayTeamGoals) count += 1;
      return count;
    });
    return vitorias.reduce((acc, curr) => acc + curr, 0);
  },
  totalDraws: (home: homeTeam[]) => {
    const draws = home.map((el) => {
      let count = 0;
      if (el.homeTeamGoals === el.awayTeamGoals) count += 1;
      return count;
    });
    return draws.reduce((acc, curr) => acc + curr, 0);
  },
  totalLosses: (home: homeTeam[]) => {
    const losses = home.map((el) => {
      let count = 0;
      if (el.homeTeamGoals < el.awayTeamGoals) count += 1;
      return count;
    });
    return losses.reduce((acc, curr) => acc + curr, 0);
  },
  goalsFavor: (home: homeTeam[]) => {
    const goalsFavor = home.map((el) => {
      let countGoals = 0;
      countGoals += el.homeTeamGoals;
      return countGoals;
    });
    return goalsFavor.reduce((acc, curr) => acc + curr, 0);
  },
  goalsOwn: (home: homeTeam[]) => {
    const goalsContra = home.map((el) => {
      let count = 0;
      count += el.homeTeamGoals;
      return count;
    });
    return goalsContra.reduce((acc, curr) => acc + curr, 0);
  },
  goalsBalance: (home: homeTeam[]) => {
    const balance = homeLeaderboard.goalsFavor(home) - homeLeaderboard.goalsOwn(home);
    return balance;
  },
  efficiency: (home: homeTeam[]) => {
    const efficiency = (
      homeLeaderboard.totalPoints(home) / (homeLeaderboard.totalGames(home) * 3)) * 100;
    return efficiency.toFixed(2);
  },
};

export default homeLeaderboard;

export const awayLeaderboard = {
  totalGames: (away: homeTeam[]) => away.length,
  totalPoints: (away: homeTeam[]) => {
    const totalPoints = (
      awayLeaderboard.totalVictories(away) * 3 + awayLeaderboard.totalDraws(away));
    return totalPoints;
  },
  totalVictories: (team: homeTeam[]) => {
    const victories = team.reduce((acc, curr) => {
      let count = acc;
      if (curr.awayTeamGoals > curr.homeTeamGoals) count += 1;
      return count;
    }, 0);
    return victories;
  },
  totalDraws: (away: homeTeam[]) => {
    const draws = away.reduce((acc, curr) => {
      let count = acc;
      if (curr.awayTeamGoals === curr.homeTeamGoals) count += 1;
      return count;
    }, 0);
    return draws;
  },
  totalLosses: (away: homeTeam[]) => {
    const losses = away.reduce((acc, curr) => {
      let count = acc;
      if (curr.awayTeamGoals < curr.homeTeamGoals) count += 1;
      return count;
    }, 0);
    return losses;
  },
  goalsFavor: (away: homeTeam[]) => {
    const goalsFavor = away.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    return goalsFavor;
  },
  goalsOwn: (away: homeTeam[]) => {
    const goalsOwn = away.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return goalsOwn;
  },
  goalsBalance: (away: homeTeam[]) => {
    const balance = awayLeaderboard.goalsFavor(away) - awayLeaderboard.goalsOwn(away);
    return balance;
  },
  efficiency: (away: homeTeam[]) => {
    const efficiency = (
      awayLeaderboard.totalPoints(away) / (awayLeaderboard.totalGames(away) * 3)) * 100;
    return efficiency.toFixed(2);
  },
};
