import { TCustomer } from "@/modules/Customer/types/customer";
import { TEmployee } from "@/modules/Employees/types/employee";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import { TBaseTable, TTable } from "@/modules/Tables/types/table";

// Basic order item
export type OrderItem = {
  id: string;
  name: string;
  takeOut: boolean;
  price: number;
  quantity: number;
};

// Payload for creating/updating an order
export type TOrderPayload = {
  items: OrderItem[];
  tableId: string | null;
  waiterId: string | null;
  total: number;
  orderNumber: string;
  customerId: string;
};

export type TOrderStatus =
  | "new"
  | "in progress"
  | "completed"
  | "paid"
  | "cancelled";
// Core order type (matches DB)
export type TOrder = {
  id: string;
  tableName: string;
  items: OrderItem[];
  total: number;
  orderNumber: string;
  status: TOrderStatus;
  paymentMethod?: "cash" | "card" | "transfer" | null;
  createdAt: string;
  updatedAt: string;
  invoiceNumber: string;
  discount?: boolean;
  table: TTable;
  customer: TCustomer;
  waiter: TEmployee;
};

// Updated TOrderDataStore interface for the fixed store
export type SortDirection = "asc" | "desc";

export interface TOrderDataStore {
  orders: TOrder[];
  filteredOrders: TOrder[];
  isLoading: boolean;
  sortBy: string | null;
  sortDirection: SortDirection;
  status: string;
  search: string;
  startDate: string | null; // changed from Date | null
  endDate: string | null; // changed from Date | null
  setSortDirection: (sortDirection: SortDirection) => void;
  getFilteredOrdersSum: () => number;
  setSortBy: (sortBy: string | null) => void;
  setStatus: (status: string) => void;
  setSearch: (search: string) => void;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  clearDateRange: () => void;
  setOrders: (orders: TOrder[]) => void;
  addOrder: (order: TOrder) => void;
  updateOrder: (order: TOrder) => void;
  removeOrder: (orderId: string) => void;
  fetchOrders: () => Promise<void>;
  applyFilters: (orders: TOrder[]) => TOrder[];
  filterOrders: () => void;
  subscribeToOrders: () => () => void;
}

export interface TFetchOrdersParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

// Supporting types
export type SortableOrderFields =
  | "createdAt"
  | "updatedAt"
  | "total"
  | "status"
  | "customerName"
  | "waiterName";


export type TOrderUtilStore = {
  // --- Modal & Table ---
  activeModal: "customer" | "summary" | "success" | null;
  selectedTable: TTable | null;
  setSelectedTable: (table: TTable) => void;
  clearSelectedTable: () => void;
  openCreateCustomerModal: () => void;
  openSuccessModal: () => void;
  openOrderSummaryModal: () => void;
  closeModal: () => void;
  isSummaryModalOpen: () => boolean;
  isCustomerModalOpen: () => boolean;

  // --- Cart ---
  selectedItems: TMenuItemsWithQtyAndTakeOut[];
  clearSelectedItem: () => void;
  addToCart: (item: TMenuItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  toggleTakeOut: (id: string) => void;

  // --- Utilities ---
  existsInCart: (id: string) => boolean;
  getItemFromCart: (id: string) => TMenuItemsWithQtyAndTakeOut | undefined;

  // --- Totals ---
  total: () => number;
  formattedTotal: () => string;
};


// Menu items with extra order info
export type TMenuItemsWithQtyAndTakeOut = TMenuItem & {
  takeOut: boolean;
  quantity: number;
};

export type TFilterOrders = {
  orders: TOrder[];
  search: string;
  sortBy: string | null;
  startDate: string | null;
  endDate: string | null;
};

// Add these to your existing TMenuItemOrderStore type definition

// Update your TMenuItemOrderStore type definition to handle both TMenuItem and TMenuItemsWithQtyAndTakeOut

export type TMenuItemOrderStore = {
  allMenuItems: TMenuItemsWithQtyAndTakeOut[];
  menuItems: TMenuItemsWithQtyAndTakeOut[];
  selectedMenuItems: TMenuItemsWithQtyAndTakeOut[];
  search: string;
  category: string;
  totalPrice: number;
  totalPriceFormatted: string;
  isLoading: boolean;

  // Setters
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;

  // Initialize and fetch
  initializeMenuItems: (items: TMenuItem[]) => void;
  fetchMenuItems: () => Promise<void>;

  // Menu item manipulation - can accept either type
  addMenuItem: (menuItem: TMenuItem) => void;
  updateMenuItem: (menuItem: TMenuItemsWithQtyAndTakeOut | TMenuItem) => void;
  removeMenuItem: (menuItemId: string) => void;

  // Filtering and selection
  filterMenuItems: () => void;
  updateSelectedMenuItems: () => void;

  // Cart actions
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleTakeOut: (id: string) => void;
  resetMenuItems: () => void;

  // Real-time subscription
  subscribeToMenuItems: () => () => void;
};
