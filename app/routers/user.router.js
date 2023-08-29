import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfOwnerAdmin from '../middlewares/checkIfOwnerAdmin.middleware.js';
import checkIfAdmin from '../middlewares/checkIfAdmin.middleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(getUserToken, checkIfOwnerAdmin, userController.getOne)
  .patch(getUserToken, checkIfOwnerAdmin, userController.updateOne)
  .delete(getUserToken, checkIfOwnerAdmin, userController.deleteOne);

router
  .route('/:id/authLevel')
  .get(getUserToken, checkIfOwnerAdmin, userController.getAuthLevel);

router
  .route('/')
  .get(getUserToken, checkIfAdmin, userController.getAll);

export default router;
