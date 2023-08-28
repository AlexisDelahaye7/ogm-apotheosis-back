import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';

const router = express.Router();

router.route('/')
  .get(scenarioController.getAll);

router.route('/:id')
  .get(scenarioController.getOne)
  .post(scenarioController.createOne)
  .patch(scenarioController.updateOne)
  .delete(scenarioController.deleteOne);

export default router;
