import { IMatches } from '../interfaces/MatchesInterface';
import Matches from '../database/models/MatchesModel';

export default class TeamsService {
  public getAllMatchesService = async (): Promise<IMatches[]> => {
    const allMatches = await Matches.findAll({
      include: { all: true, nested: true, attributes: { exclude: ['id'] } },
    });

    return allMatches;
  };

  public getInProgressMatchesService = async (): Promise<IMatches[]> => {
    const FilteredMatches = await Matches.findAll({
      include: { all: true, nested: true, attributes: { exclude: ['id'] } },
      where: { inProgress: true },
    });

    return FilteredMatches;
  };

  public getFinishedMatchesService = async (): Promise<IMatches[]> => {
    const FilteredMatches = await Matches.findAll({
      include: { all: true, nested: true, attributes: { exclude: ['id'] } },
      where: { inProgress: false },
    });

    return FilteredMatches;
  };

  public endingMatch = async (id: string): Promise<number> => {
    const [affectedCount] = await Matches.update({ inProgress: false }, {
      where: {
        id,
      },
    });
    return affectedCount;
  };

  public scoringMatch = async (id: string, homeTeamGoals: number, awayTeamGoals: number)
  : Promise<number> => {
    const [affectedCount] = await Matches.update({ homeTeamGoals, awayTeamGoals }, {
      where: {
        id,
      },
    });

    return affectedCount;
  };

  public create = async (
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> => {
    const { dataValues } = await Matches.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return dataValues;
  };
}
