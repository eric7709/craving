import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import MenuItemOrderCard from "./MenuItemOrderCard";
import NoMenuItemsFound from "./NoMenuItemsFound";

export default function MenuItemOrderList() {
  const { menuItems } = useMenuItemDataStore();
  return (
    <div className={`p-5`}>
      {menuItems?.length > 0 ? (
        <div className="space-y-4 py-2">
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
