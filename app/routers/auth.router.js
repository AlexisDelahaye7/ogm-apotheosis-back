import express from 'express';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// route "/auth"

router
  .route('/register')
  .post(registerController.createUser);

router.post('/', loginController.login);

export default router;
