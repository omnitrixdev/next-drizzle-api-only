import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { defineConfig } from 'drizzle-kit'

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})
