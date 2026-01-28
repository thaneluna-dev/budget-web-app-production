import { FcHome } from "react-icons/fc";
import carloan from "../assets/icons8-car-100.png";
import groceries from "../assets/icons8-groceries-64.png";
import useLocalStorage from "../hooks/saveData";
import { useState } from "react";
import TotalIncome from "./TotalIncome";
import TotalExpenses from "./TotalExpenses";
import Balance from "./Balance";
import DailyBudget from "./DailyBudget";
import BudgetRemaining from "./BudgetRemaining";
import { IoAddOutline } from "react-icons/io5";
import { createExpense, getBudgetCount } from "../../configs/actions";
import expenses from "../Shared/expenses.json";
import ErrorModal from "./ErrorModal";
import TransactionHistory from "./TransactionHistory";

export const Dashboard = ({ user }) => {
  const [budget, setBudget] = useLocalStorage("budget", 0);
  const [errorOpen, setErroOpen] = useState(false);
  const [value, setValue] = useState({});
  const [touchStarted, setTouchStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  const [cardIndex, setCardIndex] = useState(0);

  const [showWeekly, setShowWeekly] = useState(false);

  const handleInputChange = async (name, item) => {
    setValue((prevValue) => ({ ...prevValue, [name]: item }));
  };

  const options = {
    timeZone: "Pacific/Honolulu",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // or false for 24-hour format
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent double submit
    setIsSubmitting(true);

    try {
      const count = await getBudgetCount(user);

      if (count === 0) {
        setErroOpen(true);
        return;
      }

      console.log("Submitting transaction...");

      await createExpense(
        value.transactionType,
        Number(value.amount),
        value.notes,
        user,
        new Intl.DateTimeFormat("en-US", options).format(new Date()),
      );

      document.getElementById("transactionForm").reset();
      setValue({});
    } catch (err) {
      console.error("Error submitting transaction:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const blockNumbers = (e) => {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleTouchStart = (event) => {
    setTouchStarted(true);
    // Optional: prevent default browser actions like scrolling/panning
    event.preventDefault();
  };
  const handleTouchEnd = (event) => {
    setTouchStarted(false);
    console.log("touch started");
    handleSubmit(event);
    // Optional: prevent default browser actions like scrolling/panning
    event.preventDefault();
  };

  const blockNumbersOnPaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (/\d/.test(pasted)) {
      e.preventDefault();
    }
  };

  // This is a placeholder for items that are added and created dynamically
  const items = ["Home Loan", "Car Loan", "Groceries"];
  const icons = [
    <FcHome className="w-15 h-15" />,
    <img src={carloan} alt="Car Loan" className="w-15 h-15" />,
    <img src={groceries} alt="Groceries" className="w-15 h-15" />,
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto md:space-y-6 md:pt-20 overflow-y-auto pb-10">
        {errorOpen && alert("A budget must be created before adding expenses!")}
        <div className="md:grid md:grid-cols-3 md:gap-5">
          <TotalIncome userEmail={user} />
          <TotalExpenses userEmail={user} />
        </div>
        <div className="md:grid md:gap-5 grid-cols-[600px]">
          <DailyBudget
            userEmail={user}
            index={cardIndex}
            setShowWeekly={setShowWeekly}
            showWeekly={showWeekly}
          />
          <BudgetRemaining userEmail={user} />
        </div>
        <div className="font-bold md:text-lg text-gray-800 bg-white border border-gray-300 md:p-4 rounded-lg shadow p-6 md:row-span-1">
          <div className="md:font-semibold">
            <IoAddOutline className="inline-block mr-2 mb-1 w-6 h-6" />
            <span className="inline-flex pb-5">Add Transaction</span>
            <form
              className="mt-5"
              id="transactionForm"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === 13) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              onSubmit={handleSubmit}
            >
              {expenses.expenses.map((item) => (
                <div key={item.name}>
                  <label className="block mb-1 font-semibold md:text-black pb-5">
                    {item.label}
                  </label>
                  {item.fieldtype === "currency" && (
                    <div className="relative">
                      <span className="absolute left-2 top-2 text-gray-500">
                        $
                      </span>
                      <input
                        type={item.fieldtype}
                        key={item.name}
                        required={item.required}
                        className="p-2 w-full mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-black text-black pl-8"
                        onChange={(e) =>
                          handleInputChange(item.name, e.target.value)
                        }
                        placeholder="0.00"
                      />
                    </div>
                  )}
                  {item.fieldtype !== "currency" && (
                    <input
                      type={item.fieldtype}
                      key={item.name}
                      required={item.required}
                      className="p-2 w-full mb-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent caret-black text-black"
                      onChange={(e) =>
                        handleInputChange(item.name, e.target.value)
                      }
                      onKeyDown={blockNumbers}
                      onPaste={blockNumbersOnPaste}
                    />
                  )}
                </div>
              ))}
              <button
                className="    bg-blue-500 text-white px-6 py-4                
    rounded-lg w-full
    text-lg font-medium
    transition-all duration-200
    active:bg-blue-700
    active:scale-[0.98]
    focus:outline-none
    focus-visible:ring-4
    focus-visible:ring-blue-300
    mt-5
    touch-manipulation"
                type="submit"
                form="transactionForm"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  "Add Transaction"
                )}
              </button>
            </form>
          </div>
        </div>
        <TransactionHistory userEmail={user} setExpenses={setAllExpenses} />
      </div>
    </>
  );
};
