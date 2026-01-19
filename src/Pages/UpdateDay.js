import { and, eq, ne } from "drizzle-orm";
import { db } from "../../configs";
import { budgetTable } from "../../configs/schema";

export async function updateDaysRemaining(owner, days) {
    const currentDay = await db.select().from(budgetTable).where(and(eq(budgetTable.owner, owner), ne(budgetTable.days, days)));
    if (currentDay.length > 0) {
        await db.update(budgetTable).set({ days: days }).where(eq(budgetTable.owner, owner));
    }
}