import Teams from '../database/models/TeamModel';
// import TeamsModel from '../models/TeamsModel';
import { ITeam } from '../interfaces/TeamInterface';

export default class TeamsService {
  // model: Teams;

  // constructor(model: Teams) {
  //   this.model = model;
  // }

  //   public async create(team: ITeam): Promise<ITeam> {
  //     const newTeam = await this.model.create(product);
  //     return newTeam;
  //   }

  public getAllTeamsService = async (): Promise<ITeam[]> => {
    const allTeams = await Teams.findAll();

    return allTeams;
  };

  public getByIdTeamsService = async (id: string): Promise<ITeam | null> => {
    const team = await Teams.findOne({ where: { id } });

    return team;
  };
}
