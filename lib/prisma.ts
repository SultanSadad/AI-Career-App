import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Konfigurasi pool pg secara eksplisit agar password terbaca sebagai string murni
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: "postgres",
  password: "postgrespassword",
  host: "localhost",
  port: 5432,
  database: "ai_career_db",
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;