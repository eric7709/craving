"use client";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import CreateMenuItemModal from "@/modules/MenuItem/components/CreateMenuItemModal";
import UpdateMenuItemModal from "@/modules/MenuItem/components/UpdateMenuItemModal";
import DeleteMenuItem from "@/modules/MenuItem/components/DeleteMenuItemModal";
import MenuItemList from "@/modules/MenuItem/components/MenuItemList";
import { TCategory } from "@/modules/Category/types/category";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import React, { useEffect } from "react";
import Header from "@/modules/Order/components/AdminHeader";
import MenuItemHeader from "@/modules/MenuItem/components/MenuItemHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";

type Props = {
  menuItems: TMenuItem[];
  categories: TCategory[];
};

export default function Base(props: Props) {
  const { menuItems, categories } = props;
  const { initializeMenuItems } = useMenuItemDataStore();
  const { setCategories } = useCategoryDataStore();
  useEffect(() => {
    initializeMenuItems(menuItems);
    setCategories(categories);
  }, []);
  return (
    <div className="h-screen flex flex-col">
      <Header children={<MenuItemHeader />} title="Menu Items" />
      <AdminBodyContainer>
        <MenuItemList />
        <DeleteMenuItem />
        <CreateMenuItemModal />
        <UpdateMenuItemModal />
      </AdminBodyContainer>
    </div>
  );
}
