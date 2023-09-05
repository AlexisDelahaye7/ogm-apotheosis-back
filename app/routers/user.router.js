import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfOwnerAdmin from '../middlewares/auth/user.checkIfOwnerAdmin.middleware.js';
import checkIfAdmin from '../middlewares/auth/checkIfAdmin.middleware.js';
import updateSchema from '../validation/schemas/user.update.schema.js';
import validate from '../middlewares/validator.middleware.js';
import controllerHandler from '../middlewares/controller.middleware.js';

const router = express.Router();

router
  .route('/:id(\\d+)')
  .get(getUserToken, checkIfOwnerAdmin, controllerHandler(userController.getOne))
  .patch(validate('body', updateSchema), getUserToken, checkIfOwnerAdmin, controllerHandler(userController.updateOne))
  .delete(getUserToken, checkIfOwnerAdmin, controllerHandler(userController.deleteOne));

router
  .route('/:id(\\d+)/authLevel')
  .get(getUserToken, checkIfOwnerAdmin, controllerHandler(userController.getAuthLevel));

router
  .route('/')
  .get(getUserToken, checkIfAdmin, controllerHandler(userController.getAll));

router
  .route('/:id(\\d+)/bookmarks')
  .get(getUserToken, checkIfOwnerAdmin, controllerHandler(userController.getBookmarks));

router
  .route('/:id(\\d+)/scenarios')
  .get(getUserToken, checkIfOwnerAdmin, controllerHandler(userController.getUserScenarios));

export default router;
