import {Client, Pool} from "pg";
import {configClient} from "../config/configClient/configClient";
import {CREATE_TABLES_QUERIES} from "./createQueries";

export async function initDb(): Promise<Pool> {
  const config = configClient.resolveDbConfig();
  const pool = new Pool(config);

  await pool.connect();

  return pool;
}

function runQuery(query: string, client: Client): void {
  client.query(query, (error, result) => {
    if (error) {
      console.error(error);

      return;
    }

    console.log(result);
    console.log(`"${query}" performed`);
  });
}
