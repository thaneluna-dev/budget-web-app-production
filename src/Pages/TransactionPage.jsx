import { MdAdd } from "react-icons/md";
import { useState } from "react";
import InputField from "../components/InputField";
import { db } from "../../configs/index.js";
import { expenseTable } from "../../configs/schema.js";

export const TransactionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await db.insert(expenseTable).values(formData);
      if (result) {
        console.log("Data saved to database");
      }
    } catch (error) {
      console.error("Error inserting transaction:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      ['email']: 'johndoe@gmail.com'
    }));
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      }}
      className="md:grid md:auto-rows-max md:grid-flow-col md:grid-cols-[200px_auto] p-5 md:bg-gray-800 md:text-gray-200 md:rounded-lg"
    >
      <h1 className="md:text-xl md:font-bold justify-center mb-5">
        Create Transaction
      </h1>

      <div className="md:grid md:row-start-2 gap-4 md:justifify-items-start">
        <button
          onClick={() => setIsOpen(true)}
          className="md:bg-black md:py-2 md:px-4 md:rounded-lg md:hover:bg-gray-700 md:transition-colors md:duration-300 md:flex md:items-center md:justify-center"
        >
          <MdAdd className="mr-2 inline-block" />
          Add Automobile Transaction
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="md:bg-black md:py-2 md:px-4 md:rounded-lg md:hover:bg-gray-700 md:transition-colors md:duration-300 md:flex md:items-center"
        >
          <MdAdd className="mr-2 inline-block" />
          Add Shopping Transaction
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="md:bg-black md:py-2 md:px-4 md:rounded-lg md:hover:bg-gray-700 md:transition-colors md:duration-300 md:flex md:items-center"
        >
          <MdAdd className="mr-2 inline-block" />
          Add Restaurant Transaction
        </button>
      </div>
      {/* Modal */}
      {isOpen && (
        <dialog
          open
          className="rounded-lg p-6 shadow-lg md:bg-white md:text-black md:w-1/3 md:m-auto"
        >
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
                setIsOpen(false);
              }
            }}
          >
            <div>
              <h2 className="text-lg font-bold mb-4">New Transaction</h2>
              <div>
                {expenses.expenses.map((expense) => (
                  <InputField
                    key={expense.name}
                    expense={expense}
                    handleInputChange={handleInputChange}
                  />
                ))}
              </div>
            </div>
            <div className="md:inline-flex w-full md:mt-4 md:justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Close
              </button>
              <button
                className="md:bg-blue-600 md:text-white md:px-4 md:py-2 md:rounded-lg md:ml-2 md:hover:bg-blue-700 md:transition-colors md:duration-300"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};
