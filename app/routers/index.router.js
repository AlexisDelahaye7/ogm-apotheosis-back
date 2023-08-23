import express from 'express';
// import scenarioRouter from './scenario.router.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middlewares/error.middleware.js';

const router = express.Router();

router.use('/', (req, res) => { res.send('coucou'); });

const users = [
  {
    username: 'admin',
    password: 'admin',
  },
];


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const valid = users.some((user) => user.username === username && user.password === password);

  const token = jwt.sign({ username }, process.env.PRIVATE_KEY, { algorithm: 'RS256' });

  if (valid) {
    res.send(token);
  } else {
    res.status(404).send('Not ok');
  }
});
// router.use('/scenario', scenarioRouter);

router.use(errorHandler);

export default router;
