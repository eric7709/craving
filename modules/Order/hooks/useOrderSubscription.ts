import { useEffect } from "react";
import { supabase } from "@/global/lib/supabase";
import { fetchOrderById } from "@/app/actions/orderActions";
import { useOrderDataStore } from "../store/useOrderDataStore";

export const useOrderSubscription = () => {
  const { setOrders, fetchOrders } = useOrderDataStore();
  useEffect(() => {
    const subscription = supabase
      .channel("orders_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        async (payload) => {
          const { eventType, new: newOrder, old: oldOrder } = payload;
          if (!newOrder && !oldOrder) return;
          if (eventType === "INSERT" && newOrder) {
            const data = await fetchOrderById(newOrder.id);
            if (data) {
              setOrders([data, ...useOrderDataStore.getState().orders]);
            }
          } else if (eventType === "UPDATE" && newOrder) {
            const data = await fetchOrderById(newOrder.id);
            if (data) {
              const orders = useOrderDataStore
                .getState()
                .orders.map((o) => (o.id === data.id ? data : o));
              setOrders(orders);
            }
          } else if (eventType === "DELETE" && oldOrder) {
            const orders = useOrderDataStore
              .getState()
              .orders.filter((o) => o.id !== oldOrder.id);
            setOrders(orders);
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          fetchOrders();
        }
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [setOrders, fetchOrders]);
};
