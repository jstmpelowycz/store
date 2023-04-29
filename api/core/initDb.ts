import {Pool} from "pg";
import {configClient} from "../config/configClient/configClient";
import {CREATE_TABLES_QUERIES} from "../db/queries";

export const initDb = (): Pool => {
  const config = configClient.resolveDbConfig();

  // eslint-disable-next-line
  console.log(config);

  const pool = new Pool(config);

  // createTables(pool);

  return pool;
}

const createTables = (pool: Pool): void => {
  CREATE_TABLES_QUERIES.forEach(async creationQuery => {
    await pool.query(creationQuery).then(r =>
        console.log(r)
    );
  })
}