"use client";

import TopTitle from "./TopTitle";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function TopCategories() {
  const { isLoading, analytics } = useAnalyticsDataStore();
  
  const topCategories = analytics?.topCategories;

  return (
    <div className="mt-10 w-full text-white">
      <TopTitle title="Top Categories" />

      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-purple-600 rounded-full animate-spin" />
        </div>
      ) : topCategories?.length === 0 ? (
        <p className="text-gray-300 mt-4">No data available</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {topCategories?.map((cat) => (
            <div
              key={cat.id}
              className="p-5 bg-purple-900 shadow-md rounded-xl shadow-purple-500"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-gray-200">
                  {cat.timesOrdered} orders
                </p>
              </div>
              <div className="flex items-end justify-between mt-2">
                <p className="text-amber-400 font-semibold">
                  {cat.percentageRevenue}%
                </p>
                <p className="text-green-400 font-bold">
                  ₦{cat.revenueGenerated.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
