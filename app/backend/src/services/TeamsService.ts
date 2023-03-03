import Teams from '../database/models/TeamModel';
import { ITeam, ITeamComplete } from '../interfaces/TeamInterface';

export default class TeamsService {
  public getAllTeamsService = async (): Promise<ITeamComplete[]> => {
    const allTeams = await Teams.findAll();

    return allTeams;
  };

  public getByIdTeamsService = async (id: string): Promise<ITeam | null> => {
    const team = await Teams.findOne({ where: { id } });

    return team;
  };
}
