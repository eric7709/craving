
"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import { useOrderDataStore } from "@/modules/Order/store/useOrderDataStore";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { TOrder } from "@/modules/Order/types/order";
import { TTable } from "@/modules/Tables/types/table";
import { useEffect } from "react";
import WaiterOrderList from "@/modules/Order/components/WaiterOrderList";

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
    <div className="h-screen flex flex-col">
      <AdminBodyContainer>
        <WaiterOrderList />
      </AdminBodyContainer>
    </div>
  );
}
