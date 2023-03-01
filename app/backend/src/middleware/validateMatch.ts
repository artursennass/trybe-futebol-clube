import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { Op } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/MatchesInterface';

export default class ValidateMatch {
  static checkTeam = async (teamId: string): Promise<IMatches | null> => {
    const user = await Matches.findOne({
      where: {
        [Op.or]: [
          { homeTeamId: teamId },
          { awayTeamId: teamId },
        ],
      },
    });

    return user;
  };

  static validation = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const homeTeam = await ValidateMatch.checkTeam(homeTeamId);
    const awayTeam = await ValidateMatch.checkTeam(awayTeamId);

    console.log('homeTeam', homeTeam);
    console.log('awayTeam', awayTeam);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }

    next();
  };
}
