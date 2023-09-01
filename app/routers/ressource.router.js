import express from 'express';
import ressourceController from '../controllers/ressource.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';

import validate from '../middlewares/validator.middleware.js';

const router = express.Router();

router.route('/')
  .get(ressourceController.getAll) // * ?scenario_id=[ID]&ressource_type=[TYPE]
  .post(validate('body', createSchema), controllerHandler(ressourceController.createOne));

router.route('/:id(\\d+)')
  .get(ressourceController.getOne)
  .patch(validate('body', updateSchema), getUserToken, isAdmin, controllerHandler(ressourceController.updateOne))
  .delete(ressourceController.deleteOne);

export default router;
