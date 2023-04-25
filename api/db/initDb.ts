import {Pool} from "pg";
import {resolveDbConfig} from "../config/configClient/configClient";
import {CREATE_TABLES_QUERIES} from "./createQueries";

async function initDb(): Promise<void> {
  const {database, ...rest} = resolveDbConfig();

  const pool = new Pool({
    database,
    ...rest,
  });

  createDb(pool, database);
  createTables(pool);

  await pool.end();
}

function createDb(pool: Pool, database: string): void {
  runPoolQuery(`CREATE DATABASE ${database}`, pool);
}

function createTables(pool: Pool): void {
  CREATE_TABLES_QUERIES.forEach((query) => {
    runPoolQuery(query, pool);
  });
}

function runPoolQuery(query: string, pool: Pool): void {
  pool.query(query, (error) => {
    if (error) {
      console.error(error);

      return;
    }

    console.log(`"${query}" performed`);
  });
}
