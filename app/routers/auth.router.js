import express from 'express';
import loginController from '../controllers/login.controller.js';
import getUserToken from '../middlewares/jwt.middleware.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// route "/auth"

router
  .route('/current')
  .get(getUserToken, userController.getCurrent);

router.route('/login')
  .post(loginController.login);

router.get('/getUserAuthLvl/:token', (req, res) => {
  res.json({ authLvl });
});

export default router;
