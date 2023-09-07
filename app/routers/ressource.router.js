import express from 'express';
import ressourceController from '../controllers/ressource.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import controllerHandler from '../middlewares/controller.middleware.js';
import createSchema from '../validation/schemas/ressource.create.schema.js';
import updateSchema from '../validation/schemas/ressource.update.schema.js';
import isAuthorAdmin from '../middlewares/auth/ressource.checkIfAuthorAdmin.middleware.js';

import validate from '../middlewares/validator.middleware.js';

const router = express.Router();

router.route('/:id(\\d+)')
  .get(getUserToken, isAuthorAdmin, ressourceController.getOne)
  .patch(validate('body', updateSchema), getUserToken, isAuthorAdmin, controllerHandler(ressourceController.updateOne))
  .delete(getUserToken, isAuthorAdmin, ressourceController.deleteOne);

router.route('/')
  .get(ressourceController.getAll)
  .post(validate('body', createSchema), controllerHandler(ressourceController.createOne));

export default router;
