import { useEffect } from "react";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";

export const useSubscribeToMenuItems = () => {
  const { subscribeToMenuItems } = useMenuItemDataStore();
  useEffect(() => {
    const unsubscribe = subscribeToMenuItems();
    return unsubscribe;
  }, [subscribeToMenuItems]);
};
