import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  service: MatchesService;

  constructor(service: MatchesService) {
    this.service = service;
  }

  public getAllMatchesController = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      let FilteredMatches;

      if (inProgress === 'true') {
        FilteredMatches = await this.service.getInProgressMatchesService();
      } else {
        FilteredMatches = await this.service.getFinishedMatchesService();
      }

      return res.status(200).json(FilteredMatches);
    }

    const allMatches = await this.service.getAllMatchesService();

    return res.status(200).json(allMatches);
  };

  // public endingMatch = async (req: Request, res: Response) => {

  // };
}
