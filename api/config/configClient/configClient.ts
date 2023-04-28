import {config} from 'dotenv';
import {resolve} from 'path';
import {PoolConfig} from "pg";

config({
  path: resolve(__dirname, '../../../../.env'),
})

export const DEFAULT_APP_PORT = 5460;
export const DEFAULT_DB_PORT = 5432;
export const DEFAULT_IDLE_TIMEOUT_MS = 3000;
export const DEFAULT_MAX_CLIENTS = 50;

interface AppConfig {
  name?: string;
  port: number;
}

type DbConfig = Pick<
  PoolConfig,
  'port'
  | 'user'
  | 'database'
  | 'password'
  | 'idleTimeoutMillis'
  | 'max'
>;

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
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_MAX_CLIENTS,
    DB_IDLE_TIMEOUT_MS,
  } = process.env;

  return {
    database: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USERNAME,
    port: Number(DB_PORT) || DEFAULT_DB_PORT,
    idleTimeoutMillis: Number(DB_IDLE_TIMEOUT_MS) || DEFAULT_IDLE_TIMEOUT_MS,
    max: Number(DB_MAX_CLIENTS) || DEFAULT_MAX_CLIENTS,
  };
};

export const configClient = {
  resolveAppConfig,
  resolveDbConfig,
}
