"use client"
import MenuCard from "./MenuCard";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";

export default function MenuList() {
  const { menuItems } = useMenuItemDataStore();

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <p className="text-slate-500 text-sm">No results found</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 p-4">
      {menuItems.map((item) => (
        <MenuCard menuItem={item} key={item.id} />
      ))}
    </div>
  );
}
