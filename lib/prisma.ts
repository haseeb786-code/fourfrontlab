import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getDatabaseUrl(): string {
  // If external PostgreSQL / MySQL URL is set, use it directly
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL
  }

  // On Vercel (read-only filesystem in /var/task), copy SQLite database to writable /tmp
  if (process.env.VERCEL) {
    const tmpDb = "/tmp/dev.db"
    if (!fs.existsSync(tmpDb)) {
      const sourceDb = path.join(process.cwd(), "prisma", "dev.db")
      if (fs.existsSync(sourceDb)) {
        try {
          fs.copyFileSync(sourceDb, tmpDb)
        } catch (err) {
          console.error("[Prisma] Could not copy SQLite database to /tmp:", err)
        }
      }
    }
    return `file:${tmpDb}`
  }

  return process.env.DATABASE_URL || "file:./dev.db"
}

const resolvedUrl = getDatabaseUrl()

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
