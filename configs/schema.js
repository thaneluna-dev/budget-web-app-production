import { integer, pgTable, varchar, numeric, text, date } from "drizzle-orm/pg-core";
export const expenseTable = pgTable("expense", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  transactionType: varchar('transactionType').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  notes: text('notes'),
  createdAt: date('createdAt').notNull(),
  owner: varchar('owner').notNull(),
});

export const incomeTable = pgTable("income", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  source: varchar('source').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  owner: varchar('owner').notNull(),
});

export const budgetTable = pgTable("budget", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  total: numeric('budgetTotal', { precision: 10, scale: 2 }).notNull(),
  owner: varchar('owner').notNull(),
  days: integer('days').notNull(),
  leftOverTotal: numeric('leftOverTotal', { precision: 10, scale: 2 }).notNull()
});