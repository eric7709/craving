"use client";
import { usePendingOrderAlarm } from "@/global/hooks/usePendingOrderAlarm";
import { useOrderDataStore } from "../store/useOrderDataStore";
import CashierOrderCard from "./CashierOrderCard";

export default function CashierOrderList() {
  const { filteredOrders: orders, search } = useOrderDataStore();


  if (!orders.length) {
    return (
      <div className="flex-1 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center text-gray-500 text-sm p-4">
        {search
          ? "No orders match your search. Try adjusting the filters or search term."
          : "No orders available."}
      </div>
    );
  }

  return (
    <div className="grid flex-1 overflow-y-auto scrollbar-none grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 auto-rows-max">
      {orders.map((order) => (
        <CashierOrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
