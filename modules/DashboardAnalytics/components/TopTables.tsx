import React from "react";
import TopTitle from "./TopTitle";

export default function TopTables() {
  // dummy data

 

  const dummyTopTables = [
    {
      id: "1",
      name: "Table 1",
      waiter: "John Doe",
      timesOrdered: 120,
      revenueGenerated: 250000,
      percentage: "30%",
    },
    {
      id: "2",
      name: "Table 4",
      waiter: "Jane Smith",
      timesOrdered: 95,
      revenueGenerated: 200000,
      percentage: "25%",
    },
    {
      id: "3",
      name: "Table 7",
      waiter: "Michael Brown",
      timesOrdered: 70,
      revenueGenerated: 150000,
      percentage: "18%",
    },
    {
      id: "4",
      name: "Table 3",
      waiter: "Alice Johnson",
      timesOrdered: 60,
      revenueGenerated: 120000,
      percentage: "15%",
    },
    {
      id: "5",
      name: "Table 2",
      waiter: "David Wilson",
      timesOrdered: 40,
      revenueGenerated: 80000,
      percentage: "12%",
    },
  ];

  return (
    <div className="mt-10 w-full text-white  ">
      <TopTitle title="Top Tables" />
      <ul className="grid grid-cols-1 gap-3">
        {dummyTopTables.map((table) => (
          <li
            key={table.id}
            className="p-5 bg-green-900 shadow-md rounded-xl shadow-green-500"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{table.name}</p>
              <p className="text-xs text-gray-200">Waiter: {table.waiter}</p>
              <p className="text-xs text-gray-200">
                {table.timesOrdered} orders
              </p>
            </div>
            <div className="flex items-end justify-between mt-2">
              <p className="text-amber-400 font-semibold">{table.percentage}</p>
              <p className="text-green-400 font-bold">
                ₦{table.revenueGenerated.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
