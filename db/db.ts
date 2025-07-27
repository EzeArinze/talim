import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/types/env";
import * as schema from "./schema";

const client = neon(env.DATABASE_URL!);
export const db = drizzle({ client: client, schema: schema });

// import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
// import { env } from "@/types/env";
// import * as schema from "./schema";

// config({ path: ".env.local" });

// let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

// const getDb = () => {
//   if (!_db) {
//     const client = neon(env.DATABASE_URL);
//     _db = drizzle<typeof schema>(client, { schema });
//   }
//   return _db;
// };

// export const db = getDb();
