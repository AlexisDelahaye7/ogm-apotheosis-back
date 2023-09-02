import express from 'express';
import categoryController from '../controllers/category.controller.js';
import controllerHandler from '../middlewares/controller.middleware.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import isAdmin from '../middlewares/auth/checkIfAdmin.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import createSchema from '../validation/schemas/category.create.schema.js';
import updateSchema from '../validation/schemas/category.update.schema.js';

const router = express.Router();

router.route('/')
  .get(controllerHandler(categoryController.getAll))
  .post(validate('body', createSchema), controllerHandler(categoryController.createOne));

router.route('/:id(\\d+)')
  .get(controllerHandler(categoryController.getOne))
  .patch(validate('body', updateSchema), getUserToken, isAdmin, controllerHandler(categoryController.updateOne))
  .delete(controllerHandler(categoryController.deleteOne));

export default router;
