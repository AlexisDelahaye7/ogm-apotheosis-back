import express from 'express';
import scenarioRouter from './scenario.router.js';
import authRouter from './auth.router.js';

import { errorHandler } from '../middlewares/error.middleware.js';

const router = express.Router();

router.use('/auth', authRouter);

router.use('/scenario', scenarioRouter);

router.use('/', (req, res) => { res.send('coucou'); });

router.use(errorHandler);

export default router;
