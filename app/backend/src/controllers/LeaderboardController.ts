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

    const orderedLeaderboard = await GenerateTeamStats.leaderboard(allTeams);

    return res.status(200).json(orderedLeaderboard);
  };

  public getLeaderboardHome = async (_req: Request, res: Response) => {
    const allTeams = await this.service.getAllTeamsService();

    const orderedLeaderboard = await GenerateTeamStats.leaderboard(allTeams, 'home');

    return res.status(200).json(orderedLeaderboard);
  };

  public getLeaderboardAway = async (_req: Request, res: Response) => {
    const allTeams = await this.service.getAllTeamsService();

    const orderedLeaderboard = await GenerateTeamStats.leaderboard(allTeams, 'away');

    return res.status(200).json(orderedLeaderboard);
  };
}
