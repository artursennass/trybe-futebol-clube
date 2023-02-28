import * as express from 'express';
import TeamsRouter from './TeamsRouter';
// import LoginRouter from './LoginRouter';

const router = express.Router();

router.use('/teams', TeamsRouter);

// router.use('/login', LoginRouter);

export default router;
