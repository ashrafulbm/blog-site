import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Empty fallback lets "prisma generate" run without a database (e.g. during npm install).
    // Commands that need the database (migrate, studio) still require DATABASE_URL.
    url: process.env.DATABASE_URL ?? "",
  },
});