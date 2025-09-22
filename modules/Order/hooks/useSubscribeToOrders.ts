import { useEffect } from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";

export const useSubscribeToOrders = () => {
  const { subscribeToOrders } = useOrderDataStore();
  useEffect(() => {
    const unsubscribe = subscribeToOrders();
    return () => unsubscribe();
  }, [subscribeToOrders]);
};
