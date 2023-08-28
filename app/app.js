import express from 'express';
import cors from 'cors';

import router from './routers/index.router.js';
import accessHttpMiddleware from './middlewares/request.http.middleware.js';

const app = express();

app.use(accessHttpMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(process.env.CORS_DOMAINS) ?? 'localhost');

app.use(router);

export default app;
