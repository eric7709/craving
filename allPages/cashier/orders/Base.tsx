"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import { TOrder } from "@/modules/Order/types/order";
import { TTable } from "@/modules/Tables/types/table";
import CashierOrderList from "@/modules/Order/components/CashierOrderList";
import { usePendingOrderAlarm } from "@/global/hooks/usePendingOrderAlarm";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";
import { useSubscribeToOrders } from "@/modules/Order/hooks/useSubscribeToOrders";
import { useLoadOrders } from "@/modules/Order/hooks/useLoadOrders";

type Props = {
  orders: TOrder[];
  tables: TTable[];
};

export default function Base({ orders, tables }: Props) {
  useSubscribeToOrders()
  useLoadTables(tables)
  useLoadOrders(orders)
  usePendingOrderAlarm();
  return (
    <AdminBodyContainer>
      <CashierOrderList />
    </AdminBodyContainer>
  );
}
