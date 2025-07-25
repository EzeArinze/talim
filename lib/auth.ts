import "server-only";

import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/db";
import { nextCookies } from "better-auth/next-js";
import * as schema from "../db/schema";
import { resend } from "./resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 20, // max requests in the window
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "Talim <onboarding@resend.dev>",
          to: [email],
          subject: `Hello ${email}, sign in to Talim`,
          html: `<p>Click the link below to sign in:</p><a href="${url}">Sign in</a>`,
        });
      },
    }),
    nextCookies(),
  ],
});
