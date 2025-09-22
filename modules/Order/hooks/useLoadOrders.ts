import { useEffect } from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { TOrder } from "../types/order";

export const useLoadOrders = (orders: TOrder[]) => {
  const { setOrders } = useOrderDataStore();
  useEffect(() => {
    setOrders(orders);
  }, [orders]);
};
