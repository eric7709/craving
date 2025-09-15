"use client";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import { CheckCircle, XCircle, UserPlus, ShoppingCart } from "lucide-react";
import { FaMoneyBill } from "react-icons/fa";
import { formatPrice } from "@/global/utils/formatPrice";
import { useEffect } from "react";

export default function AnalyticsTotal() {
  const { analytics, isLoading } = useAnalyticsDataStore();

  useEffect(() => {
    // In your AnalyticsTotal component, add this:
    console.log("=== FULL DEBUG ===");
    console.log("Full analytics object:", JSON.stringify(analytics, null, 2));
    console.log("orderStats specifically:", analytics?.orderStats);
    console.log("orderStats as JSON:", JSON.stringify(analytics?.orderStats));
  }, [isLoading]);

  const statistics = analytics?.orderStats;

  const defaultCards = [
    {
      title: "Paid Orders",
      value: statistics?.[1] ?? 0,
      icon: <CheckCircle className="text-green-400" size={28} />,
      bg: "bg-green-700",
      shadow: "shadow-green-500",
    },
    {
      title: "Cancelled Orders",
      value: statistics?.[0] ?? 0,
      icon: <XCircle className="text-red-400" size={28} />,
      bg: "bg-red-700",
      shadow: "shadow-red-500",
    },
    {
      title: "New Customers",
      value: statistics?.[2] ?? 0,
      icon: <UserPlus className="text-blue-400" size={28} />,
      bg: "bg-blue-700",
      shadow: "shadow-blue-500",
    },
    {
      title: "Total Revenue",
      value: statistics?.[3] ?? 0,
      icon: <FaMoneyBill className="text-amber-400" size={28} />,
      bg: "bg-amber-700",
      shadow: "shadow-amber-500",
    },
  ];

  return (
    <div className="p-6 bg-slate-900 shadow-slate-700 rounded-2xl shadow-md text-white">
      <h2 className="text-xl mb-5 font-semibold">Analytics Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {defaultCards.map((item, key) => (
          <div
            key={key}
            className={`flex flex-col items-center justify-center h-40 rounded-xl shadow-md ${item.bg} ${item.shadow} text-white`}
          >
            <div className="mb-2">
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                item.icon
              )}
            </div>
            <p className="text-[13px] font-medium text-gray-200">
              {item.title}
            </p>
            <p className="text-xl font-bold">
              {isLoading
                ? "..."
                : item.title === "Total Revenue"
                ? formatPrice(item.value)
                : item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
