import { useEffect } from "react";
import { TTable } from "../types/table";
import { useTableDataStore } from "../store/useTableDataStore";

export const useLoadTables = (tables: TTable[]) => {
  const { setTables } = useTableDataStore();
  useEffect(() => {
    setTables(tables);
  }, [tables]);
};
