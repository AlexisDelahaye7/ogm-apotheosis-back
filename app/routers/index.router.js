import express from 'express';
// import scenarioRouter from './scenario.router.js';
import login from './login.router.js';

import { errorHandler } from '../middlewares/error.middleware.js';

const router = express.Router();

router.use('/', (req, res) => { res.send('coucou'); });

router.use('/login', login);

// router.use('/scenario', scenarioRouter);

router.use(errorHandler);

export default router;
