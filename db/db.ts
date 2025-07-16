// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";

// config({ path: ".env.local" }); // or .env.local

// const client = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: client });
// import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

let _db: ReturnType<typeof drizzle> | null = null;

const getDb = () => {
  if (!_db) {
    const client = neon(process.env.DATABASE_URL!);
    _db = drizzle(client);
  }
  return _db;
};

export const db = getDb();
