"use client";
import Loading from "@/app/loading";
import MenuList from "@/app/test/MenuList";
import { useLoadCategories } from "@/modules/Category/hooks/useLoadCategories";
import { TCategory } from "@/modules/Category/types/category";
import { useLoadMenuItems } from "@/modules/MenuItem/hooks/useLoadMenuItems";
import { useSubscribeToMenuItems } from "@/modules/MenuItem/hooks/useSubscribeToMenuItems";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import Categories from "@/modules/Order/components/Categories";
import CreateCustomerModal from "@/modules/Order/components/CreateCustomerModal";
import MenuHeader from "@/modules/Order/components/MenuHeader";
import OrderButton from "@/modules/Order/components/OrderButton";
import OrderSummary from "@/modules/Order/components/OrderSummary";
import Search from "@/modules/Order/components/Search";
import { useOrderUtilStore } from "@/modules/Order/store/useOrderUtilStore";
import { TTable } from "@/modules/Tables/types/table";
import { useEffect, useState } from "react";

type Props = {
  menuItems: TMenuItem[];
  categories: TCategory[];
  table: TTable;
};

export default function Base(props: Props) {
  const { menuItems, categories, table } = props;
  const [displayed, setDisplayed] = useState(false);
  const { setSelectedTable } = useOrderUtilStore();
  useLoadCategories(categories);
  useLoadMenuItems(menuItems);
  useSubscribeToMenuItems();
  useEffect(() => {
    setSelectedTable(table);
  }, [table, setSelectedTable]);
  useEffect(() => {
    setTimeout(() => {
      setDisplayed(true);
    }, 500);
  }, []);
  if (!displayed) return <Loading />;
  return (
    <div className="h-screen overflow-x-hidden w-full flex flex-col">
      <MenuHeader />
      <div className="bg-blue-950 py-2">
        <Search />
        <Categories />
      </div>
      <div className="flex-1 scrollbar-none w-full mt-2 bg-white rounded-t-3xl overflow-y-auto">
        <MenuList />
      </div>
      <CreateCustomerModal />
      <OrderSummary />
      <OrderButton />
    </div>
  );
}
