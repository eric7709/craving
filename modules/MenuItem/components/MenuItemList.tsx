"use client";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import FadeInContainer from "@/global/components/FadeInContainer";
import AddMenuItemCard from "./AddMenuItemCard";
import MenuItemCard from "./MenuItemCard";

export default function MenuItemList() {
  const { menuItems } = useMenuItemDataStore();
  return (
    <FadeInContainer>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddMenuItemCard />
        {menuItems.map((menuItem) => (
          <MenuItemCard menuItem={menuItem} key={menuItem.id} />
        ))}
      </div>
    </FadeInContainer>
  );
}
