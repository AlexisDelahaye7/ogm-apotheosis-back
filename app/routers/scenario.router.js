import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAuthorAdmin from '../middlewares/checkIfAuthorAdmin.middleware .js';

const router = express.Router();

router.route('/')
  .get(scenarioController.getAll)
  .post(scenarioController.createOne);

router.route('/:id')
  .get(scenarioController.getOne)
  .patch(scenarioController.updateOne)
  .delete(getUserToken, checkIfAuthorAdmin, scenarioController.deleteOne);

export default router;
