"use client";
import TopTitle from "./TopTitle";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import { formatRelativeDate } from "@/global/utils/formatRelativeDate";

export default function TopCustomers() {
  const { isLoading, analytics } = useAnalyticsDataStore();

  
  const topCustomers = analytics?.topCustomers;

  
  return (
    <div className="mt-10 w-full text-white">
      <TopTitle title="Top Customers" />

      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-teal-600 rounded-full animate-spin" />
        </div>
      ) : topCustomers?.length === 0 ? (
        <p className="text-gray-300 mt-4">No data available</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {topCustomers?.map((customer) => (
            <div
              key={customer.id}
              className="p-5 bg-teal-900 shadow-md rounded-xl shadow-teal-500"
            >
              <div className="flex-1">
                <p className="font-semibold capitalize text-sm">{customer.name}</p>
                <p className="text-xs text-gray-200">
                  {customer.ordersPlaced} orders
                </p>
                <p className="text-xs text-gray-400 italic">
                  Last visit: {formatRelativeDate(customer.lastVisit)}
                </p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <p className="text-amber-400 font-semibold">
                  {customer.percentageRevenue}%
                </p>
                <p className="text-green-400 font-bold">
                  ₦{customer.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
