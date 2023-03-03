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
    // console.log('all teams', allTeams[0].dataValues);

    const leadeboard = allTeams.map(async (team) => {
      const statsGenerated = await GenerateTeamStats.generateStats(team.dataValues);
      // console.log('inside map', statsGenerated);

      return statsGenerated;
    });
    // console.log('antes', leadeboard);

    // await

    // console.log('depois', leadeboard);

    return res.status(200).json(await Promise.all(leadeboard));
  };
}
