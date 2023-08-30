import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfOwnerAdmin from '../middlewares/checkIfOwnerAdmin.middleware.js';
import checkIfAdmin from '../middlewares/checkIfAdmin.middleware.js';
import updateSchema from '../validation/schemas/updateUser.schema.js';
import validate from '../middlewares/validate.middleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(getUserToken, checkIfOwnerAdmin, userController.getOne)
  .patch(validate('body', updateSchema), getUserToken, checkIfOwnerAdmin, userController.updateOne)
  .delete(getUserToken, checkIfOwnerAdmin, userController.deleteOne);

router
  .route('/:id/authLevel')
  .get(userController.getAuthLevel);

router
  .route('/')
  .get(getUserToken, checkIfAdmin, userController.getAll);

export default router;
