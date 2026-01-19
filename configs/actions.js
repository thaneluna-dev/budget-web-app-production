"use server";

import { db } from "./index.js";
import { budgetTable, expenseTable, incomeTable } from "./schema.js";
import { sql, eq } from "drizzle-orm";

export async function getIncomeCount(owner = "") {
  const result = await db
    .select({ count: sql`count(*)` })
    .from(incomeTable)
    .where(eq(incomeTable.owner, owner));
  return result[0].count;
}

export async function getIncome(owner = "") {
  const result = await db
    .select({ total: sql`sum(amount)` })
    .from(incomeTable)
    .where(eq(incomeTable.owner, owner));

  // Ensure we return a number, even if no rows exist
  const totalIncome = result[0]?.total ? Number(result[0].total) : 0;

  return totalIncome;
}

export async function getExpenses(owner = "") {
  const result = await db
    .select({ total: sql`sum(amount)` })
    .from(expenseTable)
    .where(eq(expenseTable.owner, owner));
  return result[0]?.total ? Number(result[0].total) : 0;
}

export async function getExpenseHistory(owner = "") {
  return await db.select().from(expenseTable).where(eq(expenseTable.owner, owner));
}

export async function getExpenseCount(owner = "") {
  const result = await db
    .select({ count: sql`count(*)` })
    .from(expenseTable)
    .where(eq(expenseTable.owner, owner));
  return result[0].count;
}

export async function getBudgetIncome(owner) {
  const result = await db.select().from(budgetTable).where(eq(budgetTable.owner, owner));

  const budget = result[0];
  return budget ? budget : 0;
}

export async function getBudgetCount(owner) {
  const result = await db
    .select({ count: sql`count(*)` })
    .from(budgetTable)
    .where(eq(budgetTable.owner, owner));
  return result[0].count;
}

export async function createBudget(total, owner, days, leftOverTotal) {
  await db.insert(budgetTable).values({ total, owner, days, leftOverTotal });
}

export async function createIncome(source, amount, owner) {
  await db.insert(incomeTable).values({ source, amount, owner });
}

export async function createExpense(transactionType, amount, notes, owner, createdAt) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    throw new Error("Invalid amount");
  }

  await db.insert(expenseTable).values({
    transactionType,
    amount: numericAmount,
    notes,
    owner,
    createdAt
  });

  if (await getBudgetCount(owner) > 0) {
    const budget = await getBudgetIncome(owner);
    const leftOverTotal = Number(budget.leftOverTotal) - numericAmount;
    await db.update(budgetTable)
      .set({ leftOverTotal: leftOverTotal })
      .where(eq(budgetTable.owner, owner));
  }
} 