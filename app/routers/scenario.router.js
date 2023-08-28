import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAuthorAdmin from '../middlewares/checkIfAuthorAdmin.middleware .js';

const router = express.Router();

router.route('/')
  .get(scenarioController.getAll);

router.route('/:id')
  .get(scenarioController.getOne)
  .post(scenarioController.createOne)
  .patch(scenarioController.updateOne)
  .delete(getUserToken, checkIfAuthorAdmin, scenarioController.deleteOne);

export default router;
