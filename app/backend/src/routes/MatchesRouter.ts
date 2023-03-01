import * as express from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';

const MatchesRouter = express.Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

MatchesRouter.get('/', matchesController.getAllMatchesController);

// MatchesRouter.patch('/:id/finish', matchesController.endingMatch);

export default MatchesRouter;
