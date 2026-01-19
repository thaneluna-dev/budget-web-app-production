import { UserButton } from "@clerk/clerk-react";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = ["Dashboard", "Transactions", "Expenses"];

  return (
    <div className="flex justify-center py-4">
      {/* Logo */}
      <div className="container flex justify-between text-white">
        <div className="text-2xl md:text-3xl font-bold text-sky-500 mb-2 md:mb-0">
          <button className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-sky-400 hover:to-sky-600">
            Moneymate
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <div className="ml-auto md:self-center">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
// {tabs.map((tab) => (
//   <button
//     key={tab}
//     onClick={() => {
//       setActiveTab(tab);
//       console.log(`Switched to ${activeTab} tab`);
//     }}
//     className={`px-4 py-2 rounded-lg text-sm md:text-base hover:bg-sky-200
//       ${activeTab === tab ? "bg-sky-500 text-white" : "text-sky-500 bg-transparent"}`}
//   >
//     {tab}
//   </button>
// ))}
