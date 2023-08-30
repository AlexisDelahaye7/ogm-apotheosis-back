import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAuthorAdmin from '../middlewares/checkIfAuthorAdmin.middleware .js';
import validate from '../middlewares/validate.middleware.js';
import createScenario from '../validation/schemas/createScenario.schema.js';
import updateScenario from '../validation/schemas/updateScenario.schema.js';

const router = express.Router();

router.route('/')
  .get(scenarioController.getAll)
  .post(validate('body', createScenario), scenarioController.createOne);

router.route('/:id')
  /**
   * @swagger
   * @tags Scenario
   * @route GET /scenario/{id}
   * @param {Number} id.path.required - scenario id
   * @param {Object} scenario.body.required - scenario data
   */
  .get(scenarioController.getOne)
  .patch(validate('body', updateScenario), scenarioController.updateOne)
  .delete(getUserToken, checkIfAuthorAdmin, scenarioController.deleteOne);

export default router;
