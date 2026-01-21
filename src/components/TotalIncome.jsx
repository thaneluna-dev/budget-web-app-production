import { useEffect, useState } from "react";
import InputField from "./InputField";
import expenses from "../Shared/expenses.json";
import { createIncome, getIncome, getIncomeCount } from "../../configs/actions.js";
import { formatUSD } from "../Shared/FormatUSD.jsx";
import Modal from "./Modal.jsx";

export default function TotalIncome({userEmail}) {
  const [hasIncome, setHasIncome] = useState(true);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isIncome = true;

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const createNewIncome = async (value) => {
    await createIncome(value.source, Number(value.amount), userEmail);
  };

  useEffect(() => {
    async function checkIncome() {
      // Check if income records exist for the user
      const count = await getIncomeCount(userEmail);
      setHasIncome(count > 0);
      setLoading(false);
    }

    async function getIncomeAmount() {
      const amount = await getIncome(userEmail);
      setIncomeAmount(amount || 0);
      setLoading(false);
    }
    getIncomeAmount();
    checkIncome();
  }, []);

  return (
    <div className="font-bold md:text-lg text-gray-800 md:bg-white md:border md:border-gray-300 md:p-4 md:rounded-lg md:shadow md:p-6 col-end-2 md:row-span-auto[200px] bg-white border-gray-300 rounded-lg shadow p-6 mb-6 ">
      <div className="md:font-semibold text-base mb-10">Total Income</div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* No income exists */}
      {!loading && !hasIncome && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm text-center">
            No total income has been created yet. Please create one.
          </p>

          <button
            onClick={handleOpenModal}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors md:duration-300"
          >
            Create a total income
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className="md:backdrop-blur-sm md:h-screen md:w-full md:fixed md:top-0 md:left-0 md:flex md:items-center md:justify-center">
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={"Create New Income"}
            width={500}
            setValue={setIncomeAmount}
            value={incomeAmount}
            loadFunction={createNewIncome}
            isIncome={true}
            isBudget={false}
          />
        </div>
      )}

      {/* Income exists (placeholder for future UI) */}
      {!loading && hasIncome && (
        <>
          <div className="flex flex-col items-start gap-4">
            {formatUSD(incomeAmount)}
          </div>
          <div className="text-gray-500 md:font-medium text-sm">Full Calendar Year</div>
        </>
      )}
    </div>
  );
}
