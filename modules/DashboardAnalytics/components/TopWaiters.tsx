"use client";

import TopTitle from "./TopTitle";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function TopWaiters() {
  const { isLoading, analytics } = useAnalyticsDataStore();
  const topWaiters = analytics?.topWaiters;

  return (
    <div className="mt-10 w-full text-white">
      <TopTitle title="Top Waiters" />

      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-amber-600 rounded-full animate-spin" />
        </div>
      ) : topWaiters?.length === 0 ? (
        <p className="text-gray-300 mt-4">No data available</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {topWaiters?.map((waiter) => (
            <div
              key={waiter.id}
              className="p-5 bg-amber-900 shadow-md rounded-xl shadow-amber-500"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm">{waiter.name}</p>
                <p className="text-xs mt-1 text-gray-200">
                  {waiter.tablesServed}{" "}
                  {waiter.tablesServed == 1 ? "table" : "tables"} served
                </p>
                <p className="text-xs text-gray-200">
                  {waiter.ordersTaken} orders
                </p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <p className="text-amber-400 font-semibold">
                  {waiter.percentageRevenue}%
                </p>
                <p className="text-green-400 font-bold">
                  ₦{waiter.revenueGenerated.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
