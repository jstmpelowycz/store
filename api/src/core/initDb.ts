import {Pool} from "pg";
import {configClient} from "../../config/configClient/configClient";

export const initDb = (): Pool => {
  const config = configClient.resolveDbConfig();

  return new Pool(config);
};
