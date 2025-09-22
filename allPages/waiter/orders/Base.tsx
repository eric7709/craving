"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import { TOrder } from "@/modules/Order/types/order";
import { TTable } from "@/modules/Tables/types/table";
import WaiterOrderList from "@/modules/Order/components/WaiterOrderList";
import { useSubscribeToOrders } from "@/modules/Order/hooks/useSubscribeToOrders";
import { useLoadOrders } from "@/modules/Order/hooks/useLoadOrders";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";

type Props = {
  orders: TOrder[];
  tables: TTable[];
};

export default function Base({ orders, tables }: Props) {
  useLoadTables(tables);
  useLoadOrders(orders);
  useSubscribeToOrders();
  return (
    <div className="h-screen flex flex-col">
      <AdminBodyContainer>
        <WaiterOrderList />
      </AdminBodyContainer>
    </div>
  );
}
