import * as express from 'express';
import TeamsService from '../services/TeamsService';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = express.Router();
const teamsService = new TeamsService();
const leaderboardController = new LeaderboardController(teamsService);

LeaderboardRouter.get('/home', leaderboardController.getLeaderboard);

export default LeaderboardRouter;
