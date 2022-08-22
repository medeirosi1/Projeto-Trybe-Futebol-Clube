export default interface MatchFace {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface MatchFull {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface TeamMatchHome {
  id: number,
  teamName: string,
  homeMatch: [
    {
      id: number,
      homeTeam: number,
      homeTeamGoals: number,
      awayTeam: number,
      awayTeamGoals: number,
      inProgress: boolean
    },
  ]
}
