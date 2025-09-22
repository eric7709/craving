"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import Header from "@/modules/Order/components/AdminHeader";
import { TOrder } from "@/modules/Order/types/order";
import { TTable } from "@/modules/Tables/types/table";
import AdminOrderHeader from "@/modules/Order/components/AdminOrderHeader";
import AdminOrderList from "@/modules/Order/components/AdminOrderList";
import { useSubscribeToOrders } from "@/modules/Order/hooks/useSubscribeToOrders";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";
import { useLoadOrders } from "@/modules/Order/hooks/useLoadOrders";

type Props = {
  orders: TOrder[];
  tables: TTable[];
};

export default function Base({ orders, tables }: Props) {
  useLoadTables(tables)
  useLoadOrders(orders)
  useSubscribeToOrders()
  return (
    <div className="flex flex-col h-screen">
      <Header children={<AdminOrderHeader />} title="Orders" />
      <AdminBodyContainer>
        <AdminOrderList />
      </AdminBodyContainer>
    </div>
  );
}
