import React from "react";
import avatar from "../assets/elephant.webp";
import emptyExpense from "../assets/emptyExpenses.png";
import { useLocation } from "react-router-dom";
const EachGroupDetail = ({ group }) => {
  const location = useLocation();
  const members = Array.from({ length: 30 });
  return (
    <div>
      <div className="w-full">
        <div className="flex p-6 sticky top-0 bg-[#edeae9]">
          <div className="w-full flex justify-between relative ">
            <div className="w-32 h-28 border-4 p-2 left-6 border-white rounded-xl">
              <img className="w-28 h-28 " src={avatar} alt="" />
            </div>
            <div className="flex-grow absolute top-10 text-2xl right-10">
              <h1>{group.name}</h1>
              <p>
                <i className="bi bi-currency-rupee"></i>{" "}
                {group.totalExpenditure}{" "}
                <small className="italic">(Total spends)</small>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-2 bg-white sticky top-40">
          <div className="flex gap-x-2 whitespace-nowrap overflow-x-scroll py-2">
            <a
              href="/create-expense"
              className="bg-black rounded-md px-8 py-2 text-white uppercase tracking-wider"
            >
              Create an Expense
            </a>
            <a
              href=""
              className="bg-black rounded-md px-8 py-2 text-white uppercase tracking-wider"
            >
              Settle Up
            </a>
            <a
              href=""
              className="bg-black rounded-md px-8 py-2 text-white uppercase tracking-wider"
            >
              Total Expenditures
            </a>
          </div>
        </div>
        <div className="-z-10 sticky">
          <ul className="w-full space-y-2 px-2">
            {group.expenses ? (
              <div className="flex justify-center flex-col">
                <img src={emptyExpense} alt="" />
                <p className="m-auto text-lg px-10 text-center">
                  No expense to Show. Add expense with your friends
                </p>
              </div>
            ) : (
              <div>
                {members.map((m, index) => (
                  <li key={index} className="w-full  bg-gray-300/30 p-2">
                    {index}
                  </li>
                ))}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EachGroupDetail;
