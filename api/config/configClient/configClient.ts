import {config} from 'dotenv';
import {PoolConfig} from "pg";

config();

export const DEFAULT_DB_PORT = 5432;

type CustomPoolConfig = Pick<PoolConfig, 'port' | 'host' | 'user' | 'database' | 'password'>;

export const resolveDbConfig = (): CustomPoolConfig => {
  const {
    DB_PORT,
    DB_USER,
    DB_NAME,
    DB_HOST,
    DB_PASSWORD,
  } = process.env;

  return {
    port: parseInt(DB_PORT) || DEFAULT_DB_PORT,
    database: DB_NAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    user: DB_USER,
  };
};
