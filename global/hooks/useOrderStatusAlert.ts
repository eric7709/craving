"use client";

import { useOrderDataStore } from "@/modules/Order/store/useOrderDataStore";
import { TOrder } from "@/modules/Order/types/order";
import { useEffect, useRef } from "react";

export function useOrderStatusAlert() {
  const { orders, isLoading, subscribeToOrders } = useOrderDataStore();
  const prevNewOrdersCountRef = useRef<number>(0);

  // Beep function (from handleTest)
  const playBeep = async () => {
    try {
      const context = new AudioContext();
      await context.resume();

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(800, context.currentTime);
      oscillator.type = "square";
      gainNode.gain.setValueAtTime(0.5, context.currentTime);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
    } catch (err) {
      console.error("Failed to play beep:", err);
    }
  };

  useEffect(() => {
    // Subscribe to real-time order updates
    const unsubscribe = subscribeToOrders();
    return () => {
      unsubscribe();
    };
  }, [subscribeToOrders]);

  useEffect(() => {
    // Count orders with status "new"
    const newOrdersCount = orders.filter((order: TOrder) => order.status === "new").length;

    // Play beep only if the number of new orders increased
    if (newOrdersCount > prevNewOrdersCountRef.current && newOrdersCount > 0) {
      console.log("New orders detected:", newOrdersCount);
      playBeep();
    }

    // Update previous count
    prevNewOrdersCountRef.current = newOrdersCount;
  }, [orders]);

  return { isLoading };
}