import dotenv from "dotenv";
const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });

export const config = {
  database: process.env.DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST_DEVELOPMENT,
  dialect: process.env.DB_DIALECT,
};
