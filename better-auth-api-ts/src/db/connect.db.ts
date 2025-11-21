import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import config from "../environment-variables";

const sql = neon(config.DATABASE_URL);
const db = drizzle({ client: sql });
export default db;
