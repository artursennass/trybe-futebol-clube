import TeamsModel from '../models/TeamsModel';
import connection from '../models/connection';
import { ITeam } from '../interfaces/TeamInterface';

export default class TeamsService {
  model: TeamsModel;

  constructor() {
    this.model = new TeamsModel(connection);
  }

  //   public async create(team: ITeam): Promise<ITeam> {
  //     const newTeam = await this.model.create(product);
  //     return newTeam;
  //   }

  public async getAllTeamsService(): Promise<ITeam[]> {
    const allTeams = await this.model.getAllTeamsModel();

    return allTeams;
  }
}
