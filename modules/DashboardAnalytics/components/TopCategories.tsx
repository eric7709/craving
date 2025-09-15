import React from "react";
import TopTitle from "./TopTitle";

export default function TopCategories() {

  const dummyTopCategories = [
    {
      id: "1",
      name: "Main Dish",
      timesOrdered: 250,
      revenueGenerated: 400000,
      percentage: "40%",
    },
    {
      id: "2",
      name: "Snacks",
      timesOrdered: 150,
      revenueGenerated: 220000,
      percentage: "25%",
    },
    {
      id: "3",
      name: "Grill",
      timesOrdered: 90,
      revenueGenerated: 130000,
      percentage: "15%",
    },
    {
      id: "4",
      name: "Fast Food",
      timesOrdered: 70,
      revenueGenerated: 110000,
      percentage: "12%",
    },
    {
      id: "5",
      name: "Drinks",
      timesOrdered: 50,
      revenueGenerated: 60000,
      percentage: "8%",
    },
  ];

  return (
    <div className="mt-10 w-full text-white ">
      <TopTitle title="Top Categories" />
      <ul className="grid grid-cols-1 gap-3">
        {dummyTopCategories.map((cat) => (
          <li
            key={cat.id}
            className="p-5 bg-purple-900 shadow-md rounded-xl shadow-purple-500"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{cat.name}</p>
              <p className="text-xs text-gray-200">{cat.timesOrdered} orders</p>
            </div>
            <div className="flex items-end justify-between mt-2">
              <p className="text-amber-400 font-semibold">{cat.percentage}</p>
              <p className="text-green-400 font-bold">
                ₦{cat.revenueGenerated.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
