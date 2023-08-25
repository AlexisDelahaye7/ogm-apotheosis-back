import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

// route "/auth"

router.post('/', loginController.login);

export default router;
