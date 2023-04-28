import {config} from 'dotenv';
import {resolve} from 'path';
import {PoolConfig} from "pg";

config({
  path: resolve(__dirname, '../../../../.env'),
})

export const DEFAULT_APP_PORT = 5460;
export const DEFAULT_DB_PORT = 5432;

interface AppConfig {
  name?: string;
  port: number;
}

type DbConfig = Pick<PoolConfig, 'port' | 'user' | 'database' | 'password'>;

const resolveAppConfig = (): AppConfig => {
  const {APP_NAME, APP_PORT} = process.env;

  return {
    name: APP_NAME,
    port: Number(APP_PORT) ?? DEFAULT_APP_PORT,
  }
};

const resolveDbConfig = (): DbConfig => {
  const {
    DB_PORT,
    DB_USER,
    DB_NAME,
    DB_PASSWORD,
  } = process.env;

  return {
    port: Number(DB_PORT) || DEFAULT_DB_PORT,
    database: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER,
  };
};

export const configClient = {
  resolveAppConfig,
  resolveDbConfig,
}
