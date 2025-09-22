import { TOrder, TOrderStatus } from "../types/order";
import { OrderDomain } from "../services/orderDomain";
import { updateOrderStatus } from "@/app/actions/orderActions";
import { useState } from "react";
export function useOrderStatus(order: TOrder) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(order.status);
  const cancelOrder = async () => {
    setStatus("cancelled");
    await updateOrderStatus(order.id, "cancelled");
  };
  const changeStatus = async () => {
    setIsUpdating(true);
    const currentStatus = order.status;
    let newStatus: TOrderStatus;
    if (currentStatus === "new") newStatus = "in progress";
    else if (currentStatus === "in progress") newStatus = "completed";
    else if (currentStatus === "completed") newStatus = "paid";
    else return;
    setStatus(newStatus);
    await updateOrderStatus(order.id, newStatus);
  };
  return {
    changeStatus,
    statusConfig: OrderDomain.statusConfig(status),
    getButtonText: OrderDomain.getButtonText(status),
    isPending: isUpdating,
    cancelOrder,
    status,
  };
}
