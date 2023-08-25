import express from 'express';
import scenarioController from '../controllers/scenarioController.js';

const router = express.Router();

router.get('/scenario', scenarioController.getAll);
router.get('/scenario/:id', scenarioController.getOne);

export default router;
