import express, {Express, json, urlencoded} from "express";

const MIDDLEWARES = [
  json(),
  urlencoded({
    extended: true,
  }),
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
