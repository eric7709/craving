import { create } from "zustand";
import { TableAllocationState, TableAllocationHistory } from "../types/table";
import { getTableAllocationHistory } from "@/app/actions/tableActions";

function getTodayISODate(): string {
  return new Date().toLocaleDateString("en-CA"); // e.g. 2025-09-26
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

    fetchAllocations: async (start?: string, end?: string) => {
      const s = start ?? get().startDate;
      const e = end ?? get().endDate;

      set({ loading: true }); // start loading
      try {
        const data = await getTableAllocationHistory(s, e);
        set({ allocations: data, startDate: s, endDate: e });
      } catch (err) {
        console.error("Failed to fetch allocations:", err);
        set({ allocations: [] });
      } finally {
        set({ loading: false }); // stop loading
      }
    },
  })
);
