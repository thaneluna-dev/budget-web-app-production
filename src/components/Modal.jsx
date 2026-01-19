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
        className="md:bg-transparent md:border-0 bg-opacity-70 md:justify-self-center md:items-center md:flex md:h-screen"
      >
        <div
          className={`md:bg-white md:rounded-lg md:shadow-lg md:w-600 md:max-w-lg max-w-xs`}
        >
          <div className="m-6 md:flex justify-between">
            <h2 className="text-xl font-bold text-black flex place-items-end">
              {title}
            </h2>
            <MdCancel
              onClick={onClose}
              className="text-black text-3xl flex cursor-pointer"
            />
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
          <div className="md:flex md:justify-end md:gap-4 divide-solid border-gray-100 rounded-none outline-none border-t-1 w-full p-5">
            <button
              onClick={onClose}
              className="bg-white text-red-500 md:rounded-lg md:hover:bg-gray-300 md:transition-colors md:duration-300 md:w-35 md:h-12 px-4 py-2 border border-gray-500 inline-flex justify-center shadow-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="md:bg-green-500 md:rounded-lg md:hover:bg-transparent-200 md:transition-colors md:duration-300 md:w-35 md:h-12 justify-center shadow-sm text-white"
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
