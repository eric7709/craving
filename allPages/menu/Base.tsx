"use client";
import Loading from "@/app/loading";
import { supabase } from "@/global/lib/supabase";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoryDataStore";
import { TCategory } from "@/modules/Category/types/category";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import Categories from "@/modules/Order/components/Categories";
import CreateCustomerModal from "@/modules/Order/components/CreateCustomerModal";
import MenuHeader from "@/modules/Order/components/MenuHeader";
import MenuItemOrderList from "@/modules/Order/components/MenuItemOrderList";
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
  const { setCategories } = useCategoryDataStore();
  const { initializeMenuItems, subscribeToMenuItems } = useMenuItemDataStore();
  const { setSelectedTable } = useOrderUtilStore();
  const [tables, setTables] = useState<TTable[]>([]);
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from("tables").select("*");
        if (data) setTables(data);
        console.log("Connection test:", { data, error });
      } catch (err) {
        console.error("Connection failed:", err);
      }
    };
    testConnection();
  }, []);

  useEffect(() => {
    console.log(tables);
  }, [tables]);

  useEffect(() => {
    initializeMenuItems(menuItems);
    setCategories(categories);
    setSelectedTable(table);
  }, [
    categories,
    table,
    menuItems,
    setCategories,
    initializeMenuItems,
    setSelectedTable,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setDisplayed(true);
    }, 400);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToMenuItems();
    return unsubscribe;
  }, [subscribeToMenuItems]);

  if (!displayed) return <Loading />;

  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <MenuHeader />
      <Search />
      <Categories />
      <div className="flex-1 scrollbar-none overflow-y-auto">
        <MenuItemOrderList />
      </div>
      <CreateCustomerModal />
      <OrderSummary />
      <OrderButton />
    </div>
  );
}
