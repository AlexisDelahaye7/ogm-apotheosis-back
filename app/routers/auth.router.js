import express from 'express';
import loginController from '../controllers/login.controller.js';

const router = express.Router();

// route "/auth"

router.route('/login')
  .post(loginController.login);

export default router;
