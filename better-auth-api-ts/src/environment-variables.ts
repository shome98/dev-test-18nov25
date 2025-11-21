import dotenv from "dotenv";
dotenv.config();
const config = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: String(process.env.DATABASE_URL),
  BETTER_AUTH_SECRET: String(process.env.BETTER_AUTH_SECRET),
  TRUSTED_ORIGIN_URL1: String(process.env.TRUSTED_ORIGIN_URL1),
  TRUSTED_ORIGIN_URL2: String(process.env.TRUSTED_ORIGIN_URL2),
};
export default config;
