import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';

const router = express.Router();

router.get('/', scenarioController.getAll);
router.get('/:id', scenarioController.getOne);

export default router;
