import { TOrder, TOrderStatus } from "../types/order";
import { OrderDomain } from "../services/orderDomain";
import { updateOrderStatus } from "@/app/actions/orderActions";
import { useUpdateOrderStatus } from "./useOrderServices";
export function useOrderStatus(order: TOrder) {
  const { mutate, isPending } = useUpdateOrderStatus();
  const cancelOrder = async () => {
    mutate({
      orderId: order.id,
      status: order.status,
    });
    await updateOrderStatus(order.id, "cancelled");
  };
  const changeStatus = async () => {
    const currentStatus = order.status;
    let newStatus: TOrderStatus;
    if (currentStatus === "new") newStatus = "in progress";
    else if (currentStatus === "in progress") newStatus = "completed";
    else if (currentStatus === "completed") newStatus = "paid";
    else return;
    mutate({
      orderId: order.id,
      status: newStatus,
    });
  };
  return {
    changeStatus,
    statusConfig: OrderDomain.statusConfig(order.status),
    getButtonText: OrderDomain.getButtonText(order.status),
    isPending,
    cancelOrder,
    status: order.status,
  };
}
