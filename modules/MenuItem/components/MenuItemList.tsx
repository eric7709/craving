"use client";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import FadeInContainer from "@/global/components/FadeInContainer";
import AddMenuItemCard from "./AddMenuItemCard";
import MenuItemCard from "./MenuItemCard";

export default function MenuItemList() {
  const { menuItems } = useMenuItemDataStore();

  const hasItems = menuItems.length > 0;

  return (
    <FadeInContainer>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddMenuItemCard />

        {hasItems ? (
          menuItems.map((menuItem) => (
            <MenuItemCard menuItem={menuItem} key={menuItem.id} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <p className="text-lg font-medium">No menu items found</p>
            <p className="text-sm">Start by adding a new item above.</p>
          </div>
        )}
      </div>
    </FadeInContainer>
  );
}
