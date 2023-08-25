import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router
  .route('/:id')
  .get(userController.getOne)
  .patch(userController.updateOne)
  .delete(userController.deleteOne);

router
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

export default router;
