
import { create } from "zustand";
import { TCategory, TCategoryUtilStore } from "../types/category";

export const useCategoryUtilStore = create<TCategoryUtilStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category: TCategory | null) =>
    set({ selectedCategory: category }),
  clearSelectedCategory: () => set({ selectedCategory: null }),
  activeModal: null,
  openDeleteModal: () =>
    set({
      activeModal: "delete",
    }),
  closeModal: () =>
    set({
      activeModal: null,
    }),
}));
