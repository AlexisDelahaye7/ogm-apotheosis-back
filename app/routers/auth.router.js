import express from 'express';
import authController from '../controllers/auth.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import userController from '../controllers/user.controller.js';
import validate from '../middlewares/validate.middleware.js';
import registerSchema from '../validation/schemas/register.schema.js';
import loginSchema from '../validation/schemas/login.schema.js';

const router = express.Router();

// route "/auth"

router
  .route('/current')
  .get(getUserToken, userController.getCurrent);

router.route('/login')
  .post(validate('body', loginSchema), authController.login);

router.route('/register')
  .post(validate('body', registerSchema), authController.register);

export default router;
