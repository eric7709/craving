import { create } from "zustand";
import { TCustomerDataStore } from "../types/customer";
import { CustomerDomain } from "../services/customerDomain";
import { getAllCustomers } from "@/app/actions/customerActions";

export const useCustomerDataStore = create<TCustomerDataStore>((set, get) => ({
  allCustomers: [],
  customers: [],
  isLoading: true,
  searchTerm: "",
  sortBy: "",
  setCustomers: (customers) => set({ allCustomers: customers, customers }),
  filterCustomers: () => {
    const { allCustomers, searchTerm, sortBy } = get();
    const filtered = CustomerDomain.filterCustomers(
      allCustomers,
      searchTerm,
      sortBy
    );
    set({ customers: filtered });
  },
  setSearchTerm: (searchTerm) => {
    set({ searchTerm });
    get().filterCustomers();
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
    get().filterCustomers();
  },
  startLoading: () =>
    set({
      isLoading: true,
    }),
  stopLoading: () =>
    set({
      isLoading: false,
    }),
  fetchCustomers: async () => {
    const { startLoading, stopLoading, setCustomers } = get();
    startLoading();
    const customers = await getAllCustomers();
    setCustomers(customers);
    stopLoading();
  },
}));
