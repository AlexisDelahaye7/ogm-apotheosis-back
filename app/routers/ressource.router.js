import express from 'express';
import ressourceController from '../controllers/ressource.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import controllerHandler from '../middlewares/controller.middleware.js';
import createSchema from '../validation/schemas/ressource.create.schema.js';
import updateSchema from '../validation/schemas/ressource.update.schema.js';

import validate from '../middlewares/validator.middleware.js';

const router = express.Router();

router.route('/')
  .get(ressourceController.getAll)
  .post(validate('body', createSchema), controllerHandler(ressourceController.createOne));

router.route('/:id(\\d+)')
  .get(ressourceController.getOne)
  .patch(validate('body', updateSchema), getUserToken, isAdmin, controllerHandler(ressourceController.updateOne))
  .delete(ressourceController.deleteOne);

export default router;
