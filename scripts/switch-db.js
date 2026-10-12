#!/usr/bin/env node

/**
 * FOUR FRONT LAB — DATABASE PROVIDER SWITCHER
 * Usage:
 *   node scripts/switch-db.js sqlite
 *   node scripts/switch-db.js postgresql
 */

const fs = require('fs')
const path = require('path')

const target = process.argv[2]?.toLowerCase()
if (!['sqlite', 'postgresql', 'postgres'].includes(target)) {
  console.log('Usage: node scripts/switch-db.js [sqlite|postgresql]')
  process.exit(1)
}

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma')
let schema = fs.readFileSync(schemaPath, 'utf8')

const isPostgres = target.startsWith('postgre')

if (isPostgres) {
  schema = schema.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}`
  )
  console.log('✓ Switched Prisma schema datasource to PostgreSQL (uses DATABASE_URL)')
} else {
  schema = schema.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {\n  provider = "sqlite"\n  url      = "file:./dev.db"\n}`
  )
  console.log('✓ Switched Prisma schema datasource to SQLite (file:./dev.db)')
}

fs.writeFileSync(schemaPath, schema, 'utf8')
console.log('Done! Run `npx prisma generate` to rebuild Prisma Client.')
