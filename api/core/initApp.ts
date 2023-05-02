import express, {Express, json, urlencoded} from "express";
import cors from 'cors';

const MIDDLEWARES = [
  json(),
  urlencoded({
    extended: true,
  }),
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
];

const bulkApplyMiddlewares = (app: Express): void => {
  MIDDLEWARES.forEach(middleware => {
    app.use(middleware)
  });
}

export const initAppWithMiddlewares = (): Express => {
  const app = express();

  bulkApplyMiddlewares(app);

  return app;
}
