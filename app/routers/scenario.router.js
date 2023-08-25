import express from 'express';
import scenarioController from '../controllers/scenarioController.js';

const router = express.Router();

router.get('/', scenarioController.getAll);
router.get('/:id', scenarioController.getOne);

export default router;
