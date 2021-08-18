import dotenv from 'dotenv';

dotenv.config({ path: `${process.cwd()}/.env` });

const {
  PLIN_DB_HOST,
  PLIN_DB_USER,
  PLIN_DB_PASS,
  PLIN_DB_NAME,
  PLIN_DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
  APP_SECRET,
} = process.env;

export {
  PLIN_DB_HOST,
  PLIN_DB_USER,
  PLIN_DB_PASS,
  PLIN_DB_NAME,
  PLIN_DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT,
  APP_SECRET,
};
