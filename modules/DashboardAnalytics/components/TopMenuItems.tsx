"use client";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import TopTitle from "./TopTitle";
import Loading from "@/app/loading";

export default function TopMenuItems() {
  const { isLoading, analytics } = useAnalyticsDataStore();
  const topMenuItems = analytics?.topMenuItems;

  if(isLoading) return <Loading />
  
  return (
    <div className="w-full mt-10 text-white">
      <TopTitle title="Top Menu Items" />
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-600 rounded-full animate-spin" />
        </div>
      ) : topMenuItems?.length === 0 ? (
        <p className="text-gray-300 mt-4">No data available</p>
      ) : (
        <ul className="grid grid-cols-1 gap-3">
          {topMenuItems?.map((item) => (
            <li
              key={item.id}
              className="p-5 bg-blue-900 shadow-md rounded-xl shadow-blue-500"
            >
              <div className="flex-1">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-200">{item.category}</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-amber-400 font-semibold">
                  {item.percentageRevenue}%
                </p>
                <div className="">
                  <p className="text-green-400 font-bold">
                    ₦{item.revenueGenerated.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-200">
                    {item.timesOrdered} orders
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
