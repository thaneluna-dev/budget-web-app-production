import { useEffect, useState } from "react";
import { getExpenseHistory, getExpenses } from "../../configs/actions";
import { IoArrowDownCircle, IoArrowUpCircle, IoTrash } from "react-icons/io5";

export default function TransactionHistory({ userEmail }) {
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    async function getExpenses() {
      const expenses = await getExpenseHistory(userEmail);
      setAllExpenses(expenses);
    }
    getExpenses();
  }, []);

  return (
    <div className="md:grid md:grid-flow-col md:grid-cols-[200px_auto] p-10 bg-white text-black rounded-lg shadow-md mt-6">
      <h1 className="md:text-xl md:font-normal md:col-span-2 mb-5">
        Recent Transactions
      </h1>

      <div className="md:col-span-2">
        {allExpenses.map((tx) => {
          const isIncome = tx.amount > 0;
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between border rounded-xl px-4 py-3 mb-4 hover:shadow-md duration-300 cursor-pointer border-gray-200"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {isIncome ? (
                  <IoArrowDownCircle className="text-red-500 w-6 h-6" />
                ) : (
                  <IoArrowUpCircle className="text-green-500 w-6 h-6" />
                )}

                <div>
                  <p className="font-semibold">{tx.name}</p>
                  <p className="text-sm text-base font-bold">{tx.transactionType}</p>
                  <p className="text-sm text-gray-500 font-bold gap-2">{tx.notes}</p>
                  <p className="text-sm text-gray-500 font-bold gap-2">{tx.createdAt}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                <p
                  className={`font-semibold ${
                    isIncome ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {isIncome ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
