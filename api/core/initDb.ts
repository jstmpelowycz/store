import {Pool} from "pg";
import {configClient} from "../config/configClient/configClient";

export const initDb = (): Pool => {
  const config = configClient.resolveDbConfig();

  // eslint-disable-next-line
  console.log(config);

  return new Pool(config);
}
