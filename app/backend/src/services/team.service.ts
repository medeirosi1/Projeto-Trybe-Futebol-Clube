import Team from '../database/models/Team';
import TemaFace from '../interfaces/ITeam';

export default class TeamService {
  list = async (): Promise<TemaFace[]> => {
    const result = await Team.findAll();
    return result;
  };

  listById = async (id: number): Promise<TemaFace | null> => {
    const result = await Team.findByPk(id);
    return result;
  };
}
