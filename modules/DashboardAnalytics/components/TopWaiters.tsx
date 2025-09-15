import React from "react";
import TopTitle from "./TopTitle";

export default function TopWaiters() {
  // dummy data
  const dummyTopWaiters = [
    {
      id: "1",
      name: "John Doe",
      tablesServed: 45,
      ordersTaken: 150,
      revenueGenerated: 350000,
      percentage: "32%",
    },
    {
      id: "2",
      name: "Jane Smith",
      tablesServed: 38,
      ordersTaken: 120,
      revenueGenerated: 280000,
      percentage: "27%",
    },
    {
      id: "3",
      name: "Michael Brown",
      tablesServed: 30,
      ordersTaken: 100,
      revenueGenerated: 210000,
      percentage: "20%",
    },
    {
      id: "4",
      name: "Alice Johnson",
      tablesServed: 25,
      ordersTaken: 85,
      revenueGenerated: 175000,
      percentage: "15%",
    },
    {
      id: "5",
      name: "David Wilson",
      tablesServed: 20,
      ordersTaken: 70,
      revenueGenerated: 140000,
      percentage: "12%",
    },
  ];

  return (
    <div className="mt-10 w-full text-white  ">
      <TopTitle title="Top Waiters" />
      <ul className="grid grid-cols-1 gap-3">
        {dummyTopWaiters.map((waiter) => (
          <li
            key={waiter.id}
            className="p-5 bg-amber-900 shadow-md rounded-xl shadow-amber-500"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{waiter.name}</p>
              <p className="text-xs text-gray-200">
                {waiter.tablesServed} tables served
              </p>
              <p className="text-xs text-gray-200">
                {waiter.ordersTaken} orders
              </p>
            </div>
            <div className="flex items-end justify-between mt-2">
              <p className="text-amber-400 font-semibold">
                {waiter.percentage}
              </p>
              <p className="text-green-400 font-bold">
                ₦{waiter.revenueGenerated.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
