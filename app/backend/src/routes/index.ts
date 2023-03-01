import * as express from 'express';
import LoginRouter from './LoginRouter';
import TeamsRouter from './TeamsRouter';

const router = express.Router();

router.use('/teams', TeamsRouter);

router.use('/login', LoginRouter);

export default router;
