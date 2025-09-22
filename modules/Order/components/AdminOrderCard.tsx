"use client";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import { TOrder } from "@/modules/Order/types/order";
import { formatPrice } from "@/global/utils/formatPrice";
import { formatRelativeDate } from "@/global/utils/formatRelativeDate";
import { useOrderStatus } from "../hooks/useOrderStatus";

export default function AdminOrderCard({ order }: { order: TOrder }) {
  const { statusConfig, cancelOrder, status } = useOrderStatus(order);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [_, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onDoubleClick={() => {
        setShowDeleteBtn(!showDeleteBtn);
      }}
      className={`p-3 select-none shadow-md flex border rounded-lg flex-col gap-3 text-sm ${statusConfig.border}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-xs">
          <p className="font-semibold capitalize">{order.customer.name}</p>
          <p className="text-[10px]">{formatRelativeDate(order.createdAt)}</p>
        </div>
        <p
          className={`ml-auto capitalize px-4 py-1.5 rounded-full shadow text-[11px] bg-gradient-to-tr ${statusConfig.bg}`}
        >
          {status}
        </p>
      </div>
      <div className="grid grid-cols-2 relative gap-2 text-xs">
        <div
          className={`flex flex-col py-2 justify-center items-center bg-gray-100 border ${statusConfig.border} rounded-lg shadow-md`}
        >
          <p className="text-gray-600">Table Number</p>
          <p className="font-semibold">{order.table.tableNumber}</p>
        </div>

        <div
          className={`flex flex-col py-2 justify-center items-center bg-gray-100 border ${statusConfig.border} rounded-lg shadow-md`}
        >
          <p className="text-gray-600">Waiter</p>
          <p className="font-semibold">{order.waiter.firstname}</p>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col text-xs my-2 gap-4">
        {order.items.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 grid place-content-center rounded-full shadow bg-blue-600 text-white">
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <p className="font-semibold capitalizep">{item.name}</p>
              {item.takeOut && (
                <Home color="oklch(72.3% 0.219 149.579)" size={15} />
              )}
            </div>
            <div className="flex ml-auto items-center gap-2">
              <p className="text-gray-800 font-medium mt-0.5 text-[11px]">
                {formatPrice(item.price, true)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div
          className={`transition-opacity duration-300 ${
            showDeleteBtn ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {status !== "cancelled" && status !== "paid" && (
            <p
              onClick={cancelOrder}
              className={` px-3  rounded-lg py-1.5 text-xs bg-red-500 shadow active:scale-90  cursor-pointer text-white font-medium duration-300 `}
            >
              Cancel Order
            </p>
          )}
        </div>
        <p className="font-semibold mt-auto text-end">
          {formatPrice(order.total)}
        </p>
      </div>
    </div>
  );
}
