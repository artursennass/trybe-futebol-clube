import Teams from '../database/models/TeamModel';
import { ITeam } from '../interfaces/TeamInterface';
// import { ITeam, ITeamComplete } from '../interfaces/TeamInterface';

export default class TeamsService {
  // : Promise<ITeamComplete[]>
  public getAllTeamsService = async () => {
    const allTeams = await Teams.findAll();

    return allTeams;
  };

  public getByIdTeamsService = async (id: string): Promise<ITeam | null> => {
    const team = await Teams.findOne({ where: { id } });

    return team;
  };
}
