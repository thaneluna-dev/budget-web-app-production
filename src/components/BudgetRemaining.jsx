import { useEffect, useState } from "react";
import InputField from "./InputField";
import expenses from "../Shared/expenses.json";
import {
  getBudgetIncome,
  getBudgetCount,
  createBudget,
} from "../../configs/actions.js";
import { formatUSD } from "../Shared/FormatUSD.jsx";
import Modal from "./Modal.jsx";

export default function BudgetRemaining({userEmail}) {
  const [hasBudget, setHasBudget] = useState(true);
  const [budgetAmount, setBudgetAmount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkBudget() {
      const count = await getBudgetCount(userEmail);
      setHasBudget(count > 0);
      setLoading(false);
    }

    async function getBudgetAmount() {
      const amount = await getBudgetIncome(userEmail);
      setBudgetAmount({ total: amount.total, days: amount.days, leftOverTotal: amount.leftOverTotal });
      setLoading(false);
    }

    getBudgetAmount();
    checkBudget();
  }, []);

  return (
    <div className="font-bold md:text-lg text-gray-800 md:bg-white md:border md:border-gray-300 md:p-4 md:rounded-lg md:shadow md:p-6 md:row-span-1 col-start-2 bg-white border-gray-300 rounded-lg shadow p-6 mb-6">
      <div className="md:font-semibold mb-10 text-base">Budget Remaining</div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No budget exists */}
      {!loading && !hasBudget && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            No budget has been set. Please create one.
          </p>
        </div>
      )}

      {/* Budget exists (placeholder for future UI) */}
      {!loading && hasBudget && (
        <>
          <div className="flex flex-col items-start">
            {formatUSD(budgetAmount.leftOverTotal)}
            <div className="text-gray-500 md:font-normal text-sm">
              Left over from budget
            </div>
          </div>
        </>
      )}
    </div>
  );
}