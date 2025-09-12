// store/useEmployeeUtilStore.ts
import { create } from "zustand";
import { TEmployeeUtilStore } from "../types/employee";

export const useEmployeeUtilStore = create<TEmployeeUtilStore>((set) => ({
  activeModal: null,
  selectedEmployee: null,
  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  openCreateModal: () => set({ activeModal: "create" }),
  openUpdateModal: () => set({ activeModal: "update" }),
  openDeleteModal: () => set({ activeModal: "delete" }),
  closeModal: () => set({ activeModal: null, selectedEmployee: null }),
}));
