import { Request, Response } from 'express';
// import productValidation from '../middleware/productValidation';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  service: TeamsService;

  constructor(service: TeamsService) {
    this.service = service;
  }

  //   public create = async (req: Request, res: Response) => {
  //     const product = req.body;
  //     const error = productValidation(product);

  //     if (error !== undefined) {
  //       if (error.details[0].message.includes('required')) {
  //         return res.status(400).json({ message: error.details[0].message });
  //       }

  //       return res.status(422).json({ message: error.details[0].message });
  //     }

  //     const addedProduct = await this.service.create(product);
  //     res.status(201).json(addedProduct);
  //   };

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
