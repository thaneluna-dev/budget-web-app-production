import { useEffect, useState } from "react";
import InputField from "./InputField";
import expenses from "../Shared/expenses.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  getBudgetIncome,
  getBudgetCount,
  createBudget,
} from "../../configs/actions.js";
import { formatUSD } from "../Shared/FormatUSD.jsx";
import Modal from "./Modal.jsx";
import { FcRight } from "react-icons/fc";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { updateDaysRemaining } from "../Pages/UpdateDay";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    position: "absolute",
  }),
};

export default function DailyBudget({ userEmail, showWeekly, setShowWeekly }) {
  const [hasBudget, setHasBudget] = useState(false);
  const [dailyBudget, setDailyBudget] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const direction = cardIndex === 0 ? -1 : 1;

  const currentDay = new Date().getDate();
  const getCount = getBudgetCount(userEmail);

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).getDate();

  const cards = [
    {
      title: "Daily Budget",
      amount: formatUSD(budgetAmount.total / daysInMonth || 0),
      notes:
        "Based on a " +
        daysInMonth +
        " day month." +
        (budgetAmount.days ? budgetAmount.days + " days remaining." : ""),
    },
    {
      title: "Weekly Budget",
      amount: formatUSD(budgetAmount.total / 7 || 0),
      notes: "Based on a 7 day week",
    },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const createNewBudget = async (value) => {
    const currentDay = new Date().getDate();
    await createBudget(
      Number(value.budgetTotal),
      userEmail,
      daysInMonth - currentDay,
      Number(value.budgetTotal),
    );
  };

  const fetchBudgetAmount = async () => {
    const amount = await getBudgetIncome(userEmail);
    setBudgetAmount({
      total: amount.total,
      days: amount.days,
    });
  };

  /* -------------------- INIT -------------------- */

  useEffect(() => {
    async function init() {
      const count = await getBudgetCount(userEmail);

      if (count > 0) {
        const remainingDays = daysInMonth - currentDay;

        await updateDaysRemaining(userEmail, remainingDays);
        await fetchBudgetAmount();

        setHasBudget(true);
      }

      setLoading(false);
    }

    if (userEmail) init();
  }, [userEmail]);

  return (
    <>
      <div className="font-bold md:text-lg text-gray-800 md:bg-white md:border md:border-gray-300 md:p-4 md:rounded-lg md:shadow md:p-6 md:row-span-1 col-end-2 bg-white border-gray-300 rounded-lg shadow p-6 mb-6 md:grid md:grid-cols-2">
        {loading && !hasBudget && (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {hasBudget && (
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={cardIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => {
                window.innerWidth > 768 &&
                  setCardIndex((i) => (i === 0 ? 1 : 0));
              }}
              drag={window.innerWidth < 768 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -80) setCardIndex(1);
                if (offset.x > 80) setCardIndex(0);
              }}
              className="cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-10">
                {cards[cardIndex].title}
              </h3>
              <p className="text-xl font-bold mt-2">
                {cards[cardIndex].amount}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {cards[cardIndex].notes}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
        {isModalOpen && (
          <div className="md:backdrop-blur-sm md:h-screen md:w-full md:fixed md:top-0 md:left-0 md:flex md:items-center md:justify-center">
            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title={"Create Budget"}
              width={100}
              setValue={setBudgetAmount}
              value={budgetAmount}
              loadFunction={createNewBudget}
              isBudget={true}
            />
          </div>
        )}
      </div>
    </>
  );
}
