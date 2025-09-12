"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import Header from "@/modules/Order/components/AdminHeader";
import { useOrderDataStore } from "@/modules/Order/store/useOrderDataStore";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { TOrder } from "@/modules/Order/types/order";
import { TTable } from "@/modules/Tables/types/table";
import { useEffect } from "react";
import AdminOrderHeader from "@/modules/Order/components/AdminOrderHeader";
import AdminOrderList from "@/modules/Order/components/AdminOrderList";

type Props = {
  orders: TOrder[];
  tables: TTable[];
};

export default function Base({ orders, tables }: Props) {
  const { setTables } = useTableDataStore();
  const { subscribeToOrders, setOrders } = useOrderDataStore();
  useEffect(() => {
    const unsubscribe = subscribeToOrders();
    return () => unsubscribe();
  }, [subscribeToOrders]);

  useEffect(() => {
    setTables(tables);
    setOrders(orders);
  }, [tables, orders, setTables, setOrders]);

  return (
    <div className="flex flex-col h-screen">
      <Header children={<AdminOrderHeader />} title="Orders" />
      <AdminBodyContainer>
        <AdminOrderList />
      </AdminBodyContainer>
    </div>
  );
}
