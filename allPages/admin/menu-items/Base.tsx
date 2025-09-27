"use client";
import CreateMenuItemModal from "@/modules/MenuItem/components/CreateMenuItemModal";
import UpdateMenuItemModal from "@/modules/MenuItem/components/UpdateMenuItemModal";
import DeleteMenuItem from "@/modules/MenuItem/components/DeleteMenuItemModal";
import MenuItemList from "@/modules/MenuItem/components/MenuItemList";
import { TCategory } from "@/modules/Category/types/category";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import MenuItemHeader from "@/modules/MenuItem/components/MenuItemHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import { useLoadCategories } from "@/modules/Category/hooks/useLoadCategories";
import { useLoadMenuItems } from "@/modules/MenuItem/hooks/useLoadMenuItems";
import AdminHeader from "@/modules/Order/components/AdminHeader";

type Props = {
  menuItems: TMenuItem[];
  categories: TCategory[];
};

export default function Base({categories, menuItems}: Props) {
  useLoadCategories(categories)
  useLoadMenuItems(menuItems)
  return (
    <div className="h-screen flex flex-col">
      <AdminHeader children={<MenuItemHeader />} title="Menu Items" />
      <AdminBodyContainer>
        <MenuItemList />
        <DeleteMenuItem />
        <CreateMenuItemModal />
        <UpdateMenuItemModal />
      </AdminBodyContainer>
    </div>
  );
}
