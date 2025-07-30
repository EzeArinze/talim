// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import { env } from "@/types/env";
// import * as schema from "./schema";

// const client = neon(env.DATABASE_URL!);
// export const db = drizzle({ client: client, schema: schema });

import { neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "@/types/env";
import * as schema from "./schema";

// Enable WebSocket
neonConfig.useSecureWebSocket = true;

export const db = drizzle(env.DATABASE_URL, { schema });
