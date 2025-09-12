"use client";
import { useOrderDataStore } from "../store/useOrderDataStore";
import WaiterOrderCard from "./WaiterOrderCard";
import { useUser } from "@/global/hooks/useUser"; // 👈 hook to get logged in user

export default function WaiterOrderList() {
  const { filteredOrders: orders } = useOrderDataStore();
  const { userEmail, isLoading } = useUser(); // 👈 assume your hook gives these

  const today = new Date().toISOString().split("T")[0];


  if (isLoading) {
    return (
      <div className="flex-1 h-[calc(100vh-56px)] flex items-center justify-center text-gray-500 text-sm">
        Loading your orders...
      </div>
    );
  }
  if (!userEmail) {
    return (
      <div className="flex-1 h-[calc(100vh-56px)] flex items-center justify-center text-gray-500 text-sm">
        Unable to load waiter info.
      </div>
    );
  }

  const myOrders = orders.filter(
    (el) =>
      el.waiter?.email === userEmail &&
      el.createdAt.startsWith(today) &&
      ["new", "in progress", "completed"].includes(el.status)
  );

  if (myOrders.length === 0) {
    return (
      <div className="flex-1 h-[calc(100vh-56px)] flex items-center justify-center text-gray-500 text-sm">
        No orders for today.
      </div>
    );
  }

  return (
    <div className="grid flex-1 overflow-y-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 auto-rows-max">
      {myOrders.map((order) => (
        <WaiterOrderCard order={order} key={order.id} />
      ))}
    </div>
  );
}
