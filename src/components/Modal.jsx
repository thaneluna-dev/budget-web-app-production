// Modal.jsx
import React, { useRef, useEffect, useState } from "react";
import expenses from "../Shared/expenses.json";
import InputField from "./InputField";
import { MdCancel } from "react-icons/md";
import { createBudget } from "../../configs/actions";
import { min } from "drizzle-orm";
import LoadingBar from "./LoadingBar";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  width,
  loadFunction,
  isIncome,
  isBudget,
}) => {
  const [value, setValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = async (name, item) => {
    setValue((prevValue) => ({ ...prevValue, [name]: item }));
  };

  const dialogRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await loadFunction(value);
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal(); // Open the modal
    } else {
      dialogRef.current.close(); // Close the modal
    }
  }, [isOpen]);

  return (
    <>
      <dialog
        ref={dialogRef}
        onClose={onClose}
        className="bg-transparent border-0 bg-opacity-70 justify-self-center items-center flex h-screen w-screen justify-center"
      >
        <div
          className={`bg-white rounded-lg shadow-lg md:w-600 md:max-w-lg md:w-screen`}
        >
          <div className="m-6 flex justify-between md:max-w-lg md:max-w-xs">
            <h2 className="text-xl font-bold text-black md:flex md:place-items-end">
              {title}
            </h2>
          </div>
          {isIncome &&
            expenses.income.map((item) => (
              <InputField
                key={item.name}
                item={item}
                handleInputChange={handleInputChange}
              />
            ))}
          {isBudget &&
            expenses.budget.map((item) => (
              <InputField
                key={item.name}
                item={item}
                handleInputChange={handleInputChange}
              />
            ))}
          <div className="flex justify-end gap-4 divide-solid border-gray-100 rounded-none outline-none border-t-1 w-full p-5">
            <button
              onClick={onClose}
              className="bg-white text-red-500 rounded-lg hover:bg-gray-300 transition-colors duration-300 md:w-35 md:h-12 h-10 px-4 py-2 border border-gray-500 inline-flex justify-center shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 rounded-md hover:bg-transparent-200 transition-colors duration-300 md:w-35 md:h-12 w-30 h-10 justify-center shadow-sm text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
