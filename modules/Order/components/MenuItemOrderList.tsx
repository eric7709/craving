import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import MenuItemOrderCard from "./MenuItemOrderCard";
import NoMenuItemsFound from "./NoMenuItemsFound";

export default function MenuItemOrderList() {
  const { menuItems } = useMenuItemDataStore();
  return (
    <div className={`p-3 `}>
      {menuItems?.length > 0 ? (
        <div className="">
          {menuItems.map((menuItem) => (
            <MenuItemOrderCard key={menuItem.id} menuItem={menuItem} />
          ))}
        </div>
      ) : (
        <NoMenuItemsFound />
      )}
    </div>
  );
}
