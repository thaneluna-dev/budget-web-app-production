import { useEffect, useState } from "react";
import { getExpenseCount, getExpenses } from "../../configs/actions.js";
import { formatUSD } from "../Shared/FormatUSD.jsx";

export default function TotalExpenses({userEmail}) {
  const [hasIncome, setHasIncome] = useState(true);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkExpenses() {
      const count = await getExpenseCount(userEmail);
      setHasIncome(count > 0);
      setLoading(false);
    }

    async function fetchExpenses() {
      const totalExpenses = await getExpenses(userEmail);
      setTotalExpense(totalExpenses);
      setLoading(false);
    }

    checkExpenses();
    fetchExpenses();
  }, []);

  return (
    <div className="font-bold md:text-lg text-gray-800 md:bg-white md:border md:border-gray-300 md:p-4 md:rounded-lg md:shadow md:p-6 md:row-span-1 bg-white border-gray-300 rounded-lg shadow p-6 mb-6 col-span-2">
      <div className="md:font-semibold text-base mb-10">Total Expenses</div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No expenses exists */}
      {!loading && !hasIncome && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            No expenses recorded yet.
          </p>
        </div>
      )}

      {/* Expense exists (placeholder for future UI) */}
      {!loading && hasIncome && (
        <div className="text-xl">
          {formatUSD(totalExpense)}
        </div>
      )}

      <div className="text-gray-500 md:font-medium text-sm">
        This month
      </div>
    </div>
  );
}
