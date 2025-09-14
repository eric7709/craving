import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import MenuItemOrderCard from "./MenuItemOrderCard";
import NoMenuItemsFound from "./NoMenuItemsFound";
import FadeInContainer from "@/global/components/FadeInContainer";

export default function MenuItemOrderList() {
  const { menuItems } = useMenuItemDataStore();
  return (
      <div className="p-4">
        {menuItems?.length > 0 ? (
          <div className="space-y-2">
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
