import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const dbInfo = {
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
};
console.log({ dbInfo });
const client = createClient(dbInfo);

export const db = drizzle(client, { schema, logger: true });
