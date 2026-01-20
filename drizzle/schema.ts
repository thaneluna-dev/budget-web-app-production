import { pgTable, integer, numeric, varchar, text, date } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const budget = pgTable("budget", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "budget_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	budgetTotal: numeric({ precision: 10, scale:  2 }).notNull(),
	owner: varchar().notNull(),
	days: integer().notNull(),
	leftOverTotal: numeric({ precision: 10, scale:  2 }).notNull(),
});

export const expense = pgTable("expense", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "expense_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	transactionType: varchar().notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	notes: text(),
	owner: varchar().notNull(),
	createdAt: date().notNull(),
});

export const income = pgTable("income", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "income_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	source: varchar().notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	owner: varchar().notNull(),
});
