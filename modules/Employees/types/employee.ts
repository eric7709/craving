export type TEmployeeDB = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  gender: string;
  role: TRole;
  is_active: boolean;
  created_at: string;
  registered_by?: string | null;
};
export type TRole = "admin" | "chef" | "cook" | "waiter" | "cashier" | "";

export type TEmployee = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: TRole;
  gender: string;
  isActive: boolean;
  createdAt: string;
};
export type TCreateEmployee = Omit<TEmployee, "id" | "createdAt">;
export type TUpdateEmployee = Partial<TCreateEmployee> & { id: string };
export type TEmployeeError = {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  role?: string;
  general?: string;
};

export type Role =
  | "waiter"
  | "staff"
  | "kitchen"
  | "guest"
  | "cook"
  | "chef"
  | "manager"
  | "admin"
  | "cashier";

export type TAuthStore = {
  user: TEmployee | null;
  loading: boolean;
  login: (user: TEmployee) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
};

export type Login = {
  email: string;
  password: string;
};

export type TEmployeeDataStore = {
  employees: TEmployee[];
  waiters: TEmployee[];
  loading: boolean;
  searchTerm: string;

  setEmployees: (data: TEmployee[]) => void;
  setWaiters: () => void;
  addEmployee: (employee: TEmployee) => void;
  updateEmployee: (employee: TEmployee) => void;
  removeEmployee: (id: string) => void;
  clear: () => void;
  setLoading: (loading: boolean) => void;

  // search
  setSearchTerm: (term: string) => void;
  filteredEmployees: () => TEmployee[];

  waitersOptions: () => { label: string; value: string }[];
};

export type TEmployeeUtilStore = {
  activeModal: "create" | "update" | "delete" | null;
  selectedEmployee: TEmployee | null;

  setSelectedEmployee: (employee: TEmployee | null) => void;

  openCreateModal: () => void;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
  closeModal: () => void;
};
