import { create } from "zustand";
import { TableAllocationState, TableAllocationHistory } from "../types/table";

function getTodayISODate(): string {
  return new Date().toLocaleDateString("en-CA"); 
}

export const useTableAllocationDataStore = create<TableAllocationState>(
  (set, get) => ({
    allocations: [],
    startDate: getTodayISODate(),
    endDate: getTodayISODate(),
    loading: false,
    setAllocations: (allocations: TableAllocationHistory[]) =>
      set({ allocations }),
    clearAllocations: () => set({ allocations: [] }),
    setDateRange: (start: string, end: string) =>
      set({ startDate: start, endDate: end }),
   
  })
);
