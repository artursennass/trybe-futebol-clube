import * as express from 'express';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = express.Router();
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

TeamsRouter.get('/', teamsController.getAllTeamsController);

TeamsRouter.get('/:id', teamsController.getByIdTeamsController);

export default TeamsRouter;
