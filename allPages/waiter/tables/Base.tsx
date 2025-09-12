"use client"
import WaiterTableList from "@/modules/Order/components/WaiterTableList";
import { useTableDataStore } from "@/modules/Tables/store/useTableDataStore";
import { TTable } from "@/modules/Tables/types/table";
import { useEffect } from "react";

type Props = {
  tables: TTable[];
};

export default function Base({ tables }: Props) {
  const { setTables, isLoading } = useTableDataStore();
  useEffect(() => {
    setTables(tables);
  }, [isLoading, setTables]);
  return <WaiterTableList />;
}
