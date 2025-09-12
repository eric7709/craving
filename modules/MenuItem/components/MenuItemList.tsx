"use client";
import MenuItemCard from "./MenuItemCard";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import AddMenuItemCard from "./AddMenuItemCard";

export default function MenuItemList() {
  const { menuItems } = useMenuItemDataStore();
  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AddMenuItemCard />
      {menuItems.map((menuItem) => (
        <MenuItemCard {...menuItem} key={menuItem.id} />
      ))}
    </div>
  );
}
