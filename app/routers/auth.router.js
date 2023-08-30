import express from 'express';
import authController from '../controllers/auth.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import registerSchema from '../validation/schemas/register.create.schema.js';
import loginSchema from '../validation/schemas/login.post.schema.js';
import controllerHandler from '../middlewares/controller.middleware.js';

const router = express.Router();

// route "/auth"

router
  .route('/current')
  .get(getUserToken, controllerHandler(authController.getCurrent));

router.route('/login')
  .post(validate('body', loginSchema), controllerHandler(authController.login));

router.route('/register')
  .post(validate('body', registerSchema), controllerHandler(authController.register));

export default router;
