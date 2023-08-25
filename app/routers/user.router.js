import express from 'express';
import userController from '../controllers/user.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import checkIfAdmin from '../middlewares/checkIfAdmin.middleware.js';

const router = express.Router();

router
  .route('/:id')
  .get(userController.getOne)
  .patch(getUserToken, checkIfAdmin, /* checkIfOwner, */ userController.updateOne) // jwt 1 owner
  .delete(userController.deleteOne); // jwt 1 owner

router
  .route('/')
  .get(userController.getAll) // jwt 3
  .post(userController.createOne);

export default router;
