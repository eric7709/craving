import { create } from "zustand";
import { TCustomerUtilStore } from "../types/customer";


export const useCustomerUtilStore = create<TCustomerUtilStore>((set) => ({
  activeModal: null,
  selectedCustomer: null,
  openCreateTableModal: () => set({ activeModal: "create" }),
  openDeleteTableModal: () => set({ activeModal: "delete" }),
  openUpdateTableModal: () => set({ activeModal: "update" }),
  closeModal: () => set({ activeModal: null, selectedCustomer: null }),
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
}));
