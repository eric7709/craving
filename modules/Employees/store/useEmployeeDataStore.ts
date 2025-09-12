import { create } from "zustand";
import { TEmployeeDataStore } from "../types/employee";
export const useEmployeeDataStore = create<TEmployeeDataStore>((set, get) => ({
  employees: [],
  loading: false,
  waiters: [],
  searchTerm: "",
  setEmployees: (data) => {
    set({ employees: data });
    get().setWaiters();
  },
  setWaiters: () => {
    const { employees } = get();
    const waiters = employees.filter((el) => el.role === "waiter");
    set({ waiters });
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
    get().setWaiters();
  },

  updateEmployee: (employee) => {
    set((state) => ({
      employees: state.employees.map((e) =>
        e.id === employee.id ? employee : e
      ),
    }));
    get().setWaiters();
  },

  removeEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((e) => e.id !== id),
    }));
    get().setWaiters();
  },

  clear: () => {
    set({ employees: [], waiters: [] });
  },

  setLoading: (loading) => set({ loading }),

  // **search**
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  filteredEmployees: () => {
    const { employees, searchTerm } = get();
    if (!searchTerm.trim()) return employees;
    return employees.filter((e) =>
      `${e.firstname} ${e.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  },

  waitersOptions: () =>
    get().waiters.map((w) => ({
      label: `${w.firstname} ${w.lastname}`,
      value: w.id,
    })),
}));
