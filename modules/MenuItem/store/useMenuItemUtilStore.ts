import { create } from "zustand";
import { TMenuItem, TMenuItemUtilStore } from "../types/menuItem";

export const useMenuItemUtilStore = create<TMenuItemUtilStore>((set) => ({
  selectedMenuItem: null,
  setSelectedMenuItem: (item) => set({ selectedMenuItem: item }),
  activeModal: null,
  openCreateModal: () => set({ activeModal: "create" }),
  openUpdateModal: () => set({ activeModal: "update" }),
  openDeleteModal: () => set({ activeModal: "delete" }),
  closeModal: () => set({ activeModal: null, selectedMenuItem: null }),
}));
