import {initDb} from "./core/initDb";
import {initAppWithMiddlewares} from "./core/initApp";
import {initServer} from "./core/initServer";
import {initEndpoints} from "./core/initEndpoints";

export const pool = initDb();
export const app = initAppWithMiddlewares();

initEndpoints();
initServer();
