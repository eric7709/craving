import React from "react";
import TopTitle from "./TopTitle";

export default function TopCustomers() {
  // dummy data


  
  
  
  const dummyTopCustomers = [
    {
      id: "1",
      name: "Samuel Adewale",
      ordersPlaced: 25,
      totalSpent: 180000,
      lastVisit: "2 days ago",
      percentage: "18%",
    },
    {
      id: "2",
      name: "Fatima Bello",
      ordersPlaced: 20,
      totalSpent: 150000,
      lastVisit: "5 days ago",
      percentage: "15%",
    },
    {
      id: "3",
      name: "Chinedu Okafor",
      ordersPlaced: 18,
      totalSpent: 130000,
      lastVisit: "1 week ago",
      percentage: "13%",
    },
    {
      id: "4",
      name: "Grace Johnson",
      ordersPlaced: 15,
      totalSpent: 110000,
      lastVisit: "3 days ago",
      percentage: "11%",
    },
    {
      id: "5",
      name: "David Mark",
      ordersPlaced: 12,
      totalSpent: 90000,
      lastVisit: "2 weeks ago",
      percentage: "9%",
    },
  ];

  return (
    <div className="mt-10 w-full text-white  ">
      <TopTitle title="Top Customers" />
      <ul className="grid grid-cols-1 gap-3">
        {dummyTopCustomers.map((customer) => (
          <li
            key={customer.id}
            className="p-5 bg-teal-900 shadow-md rounded-xl shadow-teal-500"
          >
            <div className="flex-1">
              <p className="font-semibold text-sm">{customer.name}</p>
              <p className="text-xs text-gray-200">
                {customer.ordersPlaced} orders
              </p>
              <p className="text-xs text-gray-400 italic">
                Last visit: {customer.lastVisit}
              </p>
            </div>
            <div className="flex items-end justify-between mt-2">
              <p className="text-amber-400 font-semibold">
                {customer.percentage}
              </p>
              <p className="text-green-400 font-bold">
                ₦{customer.totalSpent.toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
