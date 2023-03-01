import { Request, Response } from 'express';
import { RequestEspecial } from '../middleware/validateToken';
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

  public endingMatch = async (req: Request, res: Response) => {
    try {
      const request = req as RequestEspecial;
      const { id } = request.params;
      const endMatch = await this.service.endingMatch(id);

      if (endMatch !== 0) return res.status(200).json({ message: 'Finished' });
      return res.status(500).json({ message: 'Unable to perform task' });
    } catch (error) {
      console.log(error);
      // console.log(error.message);
      // res.status(500).json({ message: 'Erro interno', error: e.message });
    }
  };

  public scoringMatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const scoreMatch = await this.service.scoringMatch(id, homeTeamGoals, awayTeamGoals);
      console.log(scoreMatch);

      if (scoreMatch !== 0) return res.status(200).json({ message: 'Score updated' });
      return res.status(500).json({ message: 'Unable to perform task' });
    } catch (error) {
      console.log(error);
      // console.log(error.message);
      // res.status(500).json({ message: 'Erro interno', error: e.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = req.body;
    const createMatch = await this.service
      .create(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);

    return res.status(201).json({ ...createMatch });
  };
}
