"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Home, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { FaTimes } from "react-icons/fa";

import { TOrder } from "@/modules/Order/types/order";
import { formatPrice } from "@/global/utils/formatPrice";
import { formatRelativeDate } from "@/global/utils/formatRelativeDate";
import { getCurrentDateTime } from "@/global/utils/getCurrentTime";

import Invoice from "@/modules/Order/components/Invoice";
import { useOrderStatus } from "../hooks/useOrderStatus";

export default function CashierOrderCard({ order }: { order: TOrder }) {
  const { statusConfig, getButtonText, changeStatus, isPending } =
    useOrderStatus(order);
  const [time, setTime] = useState(Date.now());

  // update relative time every 10s
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => clearInterval(interval);
  }, []);

  // printing setup
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
  });

  return (
    <div
      className={`p-3 shadow-md  flex border rounded-lg flex-col gap-3 text-sm ${statusConfig.border} bg-gradient-to-br ${statusConfig.bg}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="text-xs">
          <p className="font-semibold capitalize">{order.customer.name}</p>
          <p className="text-[10px]">{formatRelativeDate(order.createdAt)}</p>
        </div>
        <p
          className={`ml-auto capitalize px-4 py-1.5 rounded-full shadow text-[11px] bg-white/70 backdrop-blur-sm`}
        >
          {order.status}
        </p>
      </div>

      {/* Table + Waiter + Print */}
      <div className="grid grid-cols-2 relative gap-2 text-xs">
        <div
          className={`flex flex-col py-2 justify-center items-center bg-white/80 border ${statusConfig.border} rounded-lg shadow-md`}
        >
          <p className="text-gray-600">Table Number</p>
          <p className="font-semibold">{order.table.tableNumber}</p>
        </div>

        {order.status !== "cancelled" && order.status !== "new" && (
          <div
            onClick={handlePrint}
            className={`h-8 w-8 bg-white rounded-full ${statusConfig.border} cursor-pointer hover:scale-105 active:scale-90 duration-300 border grid place-content-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
          >
            <Printer size={15} />
          </div>
        )}

        <div
          className={`flex flex-col py-2 justify-center items-center bg-white/80 border ${statusConfig.border} rounded-lg shadow-md`}
        >
          <p className="text-gray-600">Waiter</p>
          <p className="font-semibold">{order.waiter.firstname}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="flex flex-col text-xs my-2 gap-4">
        {order.items.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 grid place-content-center rounded-full shadow bg-blue-600 text-white">
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <p className="font-semibold">{item.name}</p>
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

      {/* Footer */}
      <div className="mt-auto space-y-2">
        <div
          className={`flex items-center mt-auto ${
            order.status !== "paid" && order.status !== "cancelled"
              ? "justify-end"
              : "justify-between"
          }`}
        >
          {order.status === "cancelled" && <FaTimes color="red" />}
          {order.status === "paid" && <Check size={18} color="green" />}
          <p className="font-semibold text-end">{formatPrice(order.total)}</p>
        </div>

        {/* Status button */}
        {order.status !== "paid" && order.status !== "cancelled" && (
          <button
            disabled={isPending}
            onClick={changeStatus}
            className={`${
              statusConfig.button
            } text-white bg-gradient-to-r rounded-lg py-2.5 text-xs duration-300 font-medium w-full ${
              isPending
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-[1.02]"
            }`}
          >
            {getButtonText}
          </button>
        )}
      </div>

      {/* Hidden invoice for printing */}
      <div style={{ display: "none" }}>
        <Invoice
          ref={invoiceRef}
          order={order}
          waiterName={order.waiter.firstname}
          currentDateTime={getCurrentDateTime()}
        />
      </div>
    </div>
  );
}
