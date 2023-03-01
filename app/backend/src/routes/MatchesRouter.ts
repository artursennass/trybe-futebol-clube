import * as express from 'express';
import MatchesService from '../services/MatchesService';
import MatchesController from '../controllers/MatchesController';
import ValidateToken, { RequestEspecial } from '../middleware/validateToken';

const MatchesRouter = express.Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

MatchesRouter.get('/', matchesController.getAllMatchesController);

MatchesRouter.patch(
  '/:id/finish',
  (req, res, next) => ValidateToken.validation(req, res, next),
  (req, res) => matchesController.endingMatch(req, res),
);

MatchesRouter.patch(
  '/:id',
  (req, res, next) => ValidateToken.validation(req, res, next),
  (req, res) => matchesController.scoringMatch(req, res),
);

MatchesRouter.post(
  '/',
  (req, res, next) => ValidateToken.validation(req as RequestEspecial, res, next),
  (req, res) => matchesController.create(req as RequestEspecial, res),
);

export default MatchesRouter;
