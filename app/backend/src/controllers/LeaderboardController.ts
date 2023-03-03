import { Request, Response } from 'express';
import GenerateTeamStats from '../middleware/generateTeamStats';
import TeamsService from '../services/TeamsService';

export default class LeaderboardController {
  service: TeamsService;

  constructor(service: TeamsService) {
    this.service = service;
  }

  public getLeaderboard = async (_req: Request, res: Response) => {
    const allTeams = await this.service.getAllTeamsService();
    // console.log('all teams', allTeams);

    const leadeboard = allTeams.map((team) => GenerateTeamStats.generateStats(team));

    return res.status(200).json(leadeboard);
  };
}
