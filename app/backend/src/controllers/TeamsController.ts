import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  service: TeamsService;

  constructor(service: TeamsService) {
    this.service = service;
  }

  public getAllTeamsController = async (_req: Request, res: Response) => {
    const allTeams = await this.service.getAllTeamsService();

    return res.status(200).json(allTeams);
  };

  public getByIdTeamsController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.getByIdTeamsService(id);

    if (!team) return res.status(404).json({ message: 'Team does not exist' });

    return res.status(200).json(team);
  };
}
