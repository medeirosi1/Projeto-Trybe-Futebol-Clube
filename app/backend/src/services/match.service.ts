import Team from '../database/models/Team';
import Match from '../database/models/Match';
import MatchFace from '../interfaces/IMatch';

export default class MatchService {
  list = async (): Promise<MatchFace[]> => {
    const result = await Match.findAll(
      { include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }] },
    );
    return result;
  };

  getByQuery = async (query: string): Promise<MatchFace[] | null> => {
    const teste = JSON.parse(query);
    console.log(teste);
    const result = await Match.findAll({
      where: { inProgress: teste },
      include: [{ model: Team, as: 'teamHome' }, { model: Team, as: 'teamAway' }],
    });
    return result;
  };

  updatedMatch = async (id: number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  create = async (match: Match): Promise<Match> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    if (homeTeam === awayTeam) {
      const e = new Error('It is not possible to create a match with two equal teams');
      e.name = 'Unauthorized';
      throw e;
    }
    const newMatch = await Match.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return newMatch;
  };
}
