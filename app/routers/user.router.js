import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfOwnerAdmin from '../middlewares/checkIfOwnerAdmin.middleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(userController.getOne)
  .patch(getUserToken, checkIfOwnerAdmin, userController.updateOne)
  .delete(getUserToken, checkIfOwnerAdmin, userController.deleteOne);

router
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

export default router;
