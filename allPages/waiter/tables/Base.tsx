"use client";
import WaiterTableList from "@/modules/Order/components/WaiterTableList";
import { useLoadTables } from "@/modules/Tables/hooks/useLoadTables";
import { TTable } from "@/modules/Tables/types/table";

type Props = {
  tables: TTable[];
};

export default function Base({ tables }: Props) {
  useLoadTables(tables);
  return <WaiterTableList />;
}
