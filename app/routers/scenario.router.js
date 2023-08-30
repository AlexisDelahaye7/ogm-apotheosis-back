import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAuthorAdmin from '../middlewares/checkIfAuthorAdmin.middleware .js';
import validate from '../middlewares/validator.middleware.js';
import createSchema from '../validation/schemas/scenario.create.schema.js';
import updateSchema from '../validation/schemas/scenario.update.schema.js';

const router = express.Router();

router.route('/')
  .get(scenarioController.getAll)
  .post(validate('body', createSchema), scenarioController.createOne);

router.route('/:id(\\d+)')
  /**
   * @swagger
   * @tags Scenario
   * @route GET /scenario/{id}
   * @param {Number} id.path.required - scenario id
   * @param {Object} scenario.body.required - scenario data
   */
  .get(scenarioController.getOne)
  .patch(validate('body', updateSchema), scenarioController.updateOne)
  .delete(getUserToken, checkIfAuthorAdmin, scenarioController.deleteOne);

export default router;
