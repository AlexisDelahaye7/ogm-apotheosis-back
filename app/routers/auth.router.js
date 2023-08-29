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
  /**
   * @summary Register a new user
   * @tags auth
   * @param {RegisterDto} request.body.required - User info
   * @return {object} 201 - User successfully registered
   * @return {Error}  400 - Bad request
   * @return {Error}  409 - User already exists
   * @return {Error}  500 - Internal server error
   * @security JWT
   * @example request - Register a new user
   * {
   *  "username": "John",
   *  "email": "email@email.com"
   *  "password": "motdepasse"
   * }
   *
   */
  .post(authController.register);

export default router;
