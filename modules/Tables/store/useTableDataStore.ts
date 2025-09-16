import { create } from "zustand";
import { TTableDataStore, TTable } from "../types/table";

export const useTableDataStore = create<TTableDataStore>((set, get) => ({
  allTables: [],
  tables: [],
  sortBy: "",
  searchTerm: "",
  isLoading: false,

  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),

  // Set all tables and apply filtering
  setTables: (tables: TTable[]) => {
    set({ allTables: tables });
    get().filterTables();
  },

  replaceTable: (tempId, newData) => {
    const newTables = get().allTables.map((el) =>
      el.id == tempId ? newData : el
    );
    set({
      tables: newTables,
      allTables: newTables,
    });
  },

  // Set search term and filter
  setSearchTerm: (searchTerm: string) => {
    set({ searchTerm });
    get().filterTables();
  },

  // Set sort field and filter
  changeSortBy: (sortBy: string) => {
    set({ sortBy });
    get().filterTables();
  },

  // Filter tables by search term and sort
  filterTables: () => {
    const { allTables, searchTerm, sortBy } = get();
    let filtered = [...allTables];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (table) =>
          table.name.toLowerCase().includes(term) ||
          table.tableNumber.toString().includes(term)
      );
    }
    if (sortBy) {
      filtered.sort((a, b) => {
        // Example: sort by name ascending
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "tableNumber") return a.tableNumber - b.tableNumber;
        return 0;
      });
    }
    set({ tables: filtered });
  },

  // CRUD operations
  addTable: (table: TTable) => {
    set((state) => {
      const allTables = [table, ...state.allTables];
      return { allTables };
    });
    get().filterTables();
  },

  updateTable: (table: TTable) => {
    set((state) => {
      const allTables = state.allTables.map((t) =>
        t.id === table.id ? table : t
      );
      return { allTables };
    });
    get().filterTables();
  },

  removeTable: (id: string) => {
    set((state) => {
      const allTables = state.allTables.filter((t) => t.id !== id);
      return { allTables };
    });
    get().filterTables();
  },
}));
