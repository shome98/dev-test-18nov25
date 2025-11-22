import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./db/connect.db";
import * as schema from "./models/index";
import { v4 as uuidv4 } from "uuid";
import config from "./environment-variables";

export const auth = betterAuth({
  secret: config.BETTER_AUTH_SECRET,
  trustedOrigins: [config.TRUSTED_ORIGIN_URL1, config.TRUSTED_ORIGIN_URL2],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {},
  sessions: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  cookies: {
    sessionToken: {
      name: "auth_session",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  },
  advanced: {
    disableCSRFCheck: process.env.NODE_ENV !== "production",
    disableOriginCheck: process.env.NODE_ENV !== "production",
    database: {
      generateId: () => uuidv4(),
    },
  },
});
export type Auth = typeof auth;
