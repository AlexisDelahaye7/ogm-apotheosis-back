import express from 'express';
import swaggerUi from 'swagger-ui-express';
import scenarioRouter from './scenario.router.js';
import authRouter from './auth.router.js';
import userRouter from './user.router.js';
import categoryRouter from './category.router.js';
import ressourceRouter from './ressource.router.js';
import swaggerDocument from '../../docs/swagger.json' assert { type: 'json' };

import { errorHandler } from '../middlewares/error.middleware.js';

const router = express.Router();

router.all('/', (req, res) => { res.send('coucou'); });

// #swagger.summary = "route d'accès à la doc de l'API"
    // #swagger.description = "Affichage de toutes les routes"
    //#swagger.tags = ['Swagger Docs']
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/auth', authRouter);

router.use('/scenario', scenarioRouter);

router.use('/user', userRouter);

router.use('/category', categoryRouter);

router.use('/ressource', ressourceRouter);

router.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
})

router.use(errorHandler);


export default router;
