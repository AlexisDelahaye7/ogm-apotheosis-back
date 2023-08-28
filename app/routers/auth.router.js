import express from 'express';
import authController from '../controllers/auth.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// route "/auth"

router
  .route('/current')
  .get(getUserToken, userController.getCurrent);

router.route('/login')
  .post(authController.login);

router.route('/register')
  .post(authController.register);

export default router;
