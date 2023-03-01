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
}
