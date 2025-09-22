import { TOrder, TOrderStatus } from "../types/order";
import { OrderDomain } from "../services/orderDomain";
import { updateOrderStatus } from "@/app/actions/orderActions";
import { useState } from "react";
export function useOrderStatus(order: TOrder) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(order.status)
  const cancelOrder = async () => {
    setIsCancelling(true);
    await updateOrderStatus(order.id, "cancelled");
    setTimeout(() => {
      setIsCancelling(false);
    }, 2000);
  };

  const changeStatus = async () => {
    setIsUpdating(true);
    const currentStatus = order.status;
    let newStatus: TOrderStatus;
    if (currentStatus === "new") newStatus = "in progress";
    else if (currentStatus === "in progress") newStatus = "completed";
    else if (currentStatus === "completed") newStatus = "paid";
    else return;
    setStatus(newStatus)
    await updateOrderStatus(order.id, newStatus);
  };
  return {
    changeStatus,
    statusConfig: OrderDomain.statusConfig(status),
    getButtonText: OrderDomain.getButtonText(status),
    isPending: isUpdating,
    cancelOrder,
    isCancelling,
    status, 
  };
}
