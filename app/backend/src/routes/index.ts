import * as express from 'express';
import LoginRouter from './LoginRouter';
import MatchesRouter from './MatchesRouter';
import TeamsRouter from './TeamsRouter';

const router = express.Router();

router.use('/teams', TeamsRouter);

router.use('/login', LoginRouter);

router.use('/matches', MatchesRouter);

export default router;
