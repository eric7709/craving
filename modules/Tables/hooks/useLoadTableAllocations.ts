import { useEffect } from "react";
import { useTableAllocationDataStore } from "../store/useTableAllocationDataStore";
import { TableAllocationHistory } from "../types/table";

export const useLoadTableAllocations = (allocations: TableAllocationHistory[]) => {
  const { setAllocations } = useTableAllocationDataStore();
  useEffect(() => {
    setAllocations(allocations);
  }, [allocations, setAllocations]);
};
