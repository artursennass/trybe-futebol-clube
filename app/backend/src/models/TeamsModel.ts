// import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
import { ITeam } from '../interfaces/TeamInterface';

export default class TeamsModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  //   public async create(team: ITeam): Promise<ITeam> {
  //     const { teamName } = team;
  //     const [dataInserted] = await this.connection.execute<ResultSetHeader>(
  //       'INSERT INTO Trybesmith.products (teamName) VALUES (?, ?)',
  //       [teamName],
  //     );
  //     const { insertId } = dataInserted;

  //     return { id: insertId, teamName };
  //   }

  public async getAllTeamsModel(): Promise<ITeam[]> {
    const query = 'SELECT * FROM ';
    const [result] = await this.connection.execute(query);

    return result as ITeam[];
  }
}
