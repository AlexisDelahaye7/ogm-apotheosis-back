import express from 'express';
import categoryController from '../controllers/category.controller.js';
import controllerHandler from '../middlewares/controller.middleware.js';

const router = express.Router();

router.route('/')
  .get(controllerHandler(categoryController.getAll));

export default router;
