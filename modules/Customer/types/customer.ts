type TBaseCustomer = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  createdAt?: string;
  discount?: number;
  discountType?: string | null;
  discountExpiry?: string | null;
  lastVisit?: string | null
};
export type TCustomerDB = {
  id: string;
  name: string;
  email: string;
  phone_number: string | null;
  created_at: string;
  discount: number;
  discount_type: string | null;
  discount_expiry: string | null;
  last_visit: string | null
};

export type TCustomer = Omit<TBaseCustomer, "password">;
export type TCreateCustomer = {
  name: string;
  email: string;
  phoneNumber?: string;
};
export type TUpdateCustomer = Partial<TBaseCustomer>;
export type TCustomerError = Partial<
  Omit<TBaseCustomer, "discount" | "phoneNumber">
> & {
  discount?: string;
  phoneNumber?: string;
  general?: string;
};

export type TCustomerUtilStore = {
  activeModal: null | "create" | "delete" | "update";
  selectedCustomer: TCustomer | null;
  openCreateTableModal: () => void;
  openDeleteTableModal: () => void;
  openUpdateTableModal: () => void;
  closeModal: () => void;
  setSelectedCustomer: (customer: TCustomer | null) => void;
};

export type TCustomerDataStore = {
  searchTerm: string;
  sortBy: string;
  customers: TCustomer[];
  allCustomers: TCustomer[];
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
  setSortBy: (sortBy: string) => void;
  startLoading: () => void;
  stopLoading: () => void;
  filterCustomers: () => void;
  setCustomers: (customers: TCustomer[]) => void;
  fetchCustomers: () => Promise<void>;
};
