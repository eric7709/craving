"use client";
import { useEffect } from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";
import AdminOrderCard from "./AdminOrderCard";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function AdminOrderList() {
  const {
    filteredOrders: orders,
    fetchOrders,
    search,
    isLoading,
  } = useOrderDataStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div className="flex-1   flex flex-col items-center justify-center gap-3 text-gray-500">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <p className="text-sm">Loading orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 text-sm p-4">
        {search
          ? "No orders match your search. Try adjusting the filters or search term."
          : "No orders available."}
      </div>
    );
  }

  return (
    <div className="grid flex-1 overflow-y-auto grid-cols-1 auto-rows-max md:grid-cols-2 xl:grid-cols-3 gap-3">
      {orders.map((order) => (
        <AdminOrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
