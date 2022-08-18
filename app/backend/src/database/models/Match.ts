import { Model, INTEGER } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'match' });

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'awayTeam' });

export default Match;
