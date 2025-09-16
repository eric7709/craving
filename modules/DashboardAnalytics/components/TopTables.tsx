"use client";
import TopTitle from "./TopTitle";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function TopTables() {
  const { isLoading, analytics } = useAnalyticsDataStore();
  const topTables = analytics?.topTables;

  return (
    <div className="mt-10 w-full text-white">
      <TopTitle title="Top Tables" />

      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-green-600 rounded-full animate-spin" />
        </div>
      ) : topTables?.length === 0 ? (
        <p className="text-gray-300 mt-4">No data available</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {topTables?.map((table) => (
            <div
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
                <p className="text-amber-400 font-semibold">
                  {table.percentageRevenue}%
                </p>
                <p className="text-green-400 font-bold">
                  ₦{table.revenueGenerated.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
