import express from 'express';
import scenarioController from '../controllers/scenario.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAuthorAdmin from '../middlewares/auth/scenario.checkIfAuthorAdmin.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import createSchema from '../validation/schemas/scenario.create.schema.js';
import updateSchema from '../validation/schemas/scenario.update.schema.js';
import controllerHandler from '../middlewares/controller.middleware.js';

const router = express.Router();

router
  .route('/:id(\\d+)/reviews')
  .get(controllerHandler(scenarioController.getReviews));

router
  .route('/:id(\\d+)/ressources')
  .get(controllerHandler(scenarioController.getRessources));

router
  .route('/:id(\\d+)/items')
  .get(controllerHandler(scenarioController.getItems));

router
  .route('/:id(\\d+)/heros')
  .get(controllerHandler(scenarioController.getHeros));

router
  .route('/:id(\\d+)/npc')
  .get(controllerHandler(scenarioController.getNpc));

router.route('/:id(\\d+)')
  /**
   * @swagger
   * @tags Scenario
   * @route GET /scenario/{id}
   * @param {Number} id.path.required - scenario id
   * @param {Object} scenario.body.required - scenario data
   */
  .get(controllerHandler(scenarioController.getOne))
  .patch(validate('body', updateSchema), controllerHandler(scenarioController.updateOne))
  .delete(getUserToken, checkIfAuthorAdmin, controllerHandler(scenarioController.deleteOne));

router.route('/')
  .get(controllerHandler(scenarioController.getAll))
  .post(validate('body', createSchema), controllerHandler(scenarioController.createOne));

export default router;
