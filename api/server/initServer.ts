import express, {Express, json, urlencoded} from 'express';
import {configClient} from "../config/configClient/configClient";

export const MIDDLEWARES = [
  json,
  urlencoded({
    extended: true,
  }),
];

export const bulkApplyMiddlewares = (app: Express) => {
  MIDDLEWARES.forEach(middleware => {
    app.use(middleware)
  });
}

export const withMiddleware = (app: Express): Express => {
  bulkApplyMiddlewares(app);

  return app;
}

export const initServer = () => {
  const {name, port} = configClient.resolveAppConfig();

  const app = express();
  const appWithMiddlewares = withMiddleware(app);

  appWithMiddlewares.listen(port, () => {
    console.log(`App "${name}" is running on port ${port}...`);
  });
};
