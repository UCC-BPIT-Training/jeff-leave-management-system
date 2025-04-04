import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';
import process from 'node:process';

const dialect = new MysqlDialect({
  pool: createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  }),
});

export const db = new Kysely({
  dialect,
});
