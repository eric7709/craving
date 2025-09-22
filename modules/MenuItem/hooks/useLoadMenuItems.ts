import { useEffect } from "react";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import { TMenuItem } from "../types/menuItem";

export const useLoadMenuItems = (menuItems: TMenuItem[]) => {
  const { setMenuItems } = useMenuItemDataStore();
  useEffect(() => {
    setMenuItems(menuItems);
  }, [menuItems]);
};
