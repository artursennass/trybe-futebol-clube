import * as express from 'express';
// import connection from '../models/connection';
// import TeamsModel from '../models/TeamsModel';
import TeamsService from '../services/TeamsService';
import TeamsController from '../controllers/TeamsController';

const TeamsRouter = express.Router();
// const teamsModel = new TeamsModel(connection);
const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

TeamsRouter.get('/', teamsController.getAllTeamsController);

// TeamsRouter.post('/', teamsController.create);

export default TeamsRouter;
