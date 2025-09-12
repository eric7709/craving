import { create } from "zustand";
import { TTable, TTableUtilStore } from "../types/table";

export const useTableUtilStore = create<TTableUtilStore>((set) => ({
  activeModal: null,
  selectedTable: null,

  openCreateTableModal: () => set({ activeModal: "create", selectedTable: null }),

  openDeallocateModal: () =>
    set({ activeModal: "deallocate", selectedTable: null }),

  openQRCodeModal: () => set({ activeModal: "qrcode", selectedTable: null }),

  openAllocateModal: () => set({ activeModal: "allocate", selectedTable: null }),

  openDeleteTableModal: () => set({ activeModal: "delete" }),

  openUpdateTableModal: () => set({ activeModal: "update" }),

  closeModal: () => set({ activeModal: null, selectedTable: null }),

  setSelectedTable: (table) => set({ selectedTable: table }),
  clearSelectedTable: () => set({ selectedTable: null }),
}));
