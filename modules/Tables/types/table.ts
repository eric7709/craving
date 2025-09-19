// Waiter info for populated table data
export type TWaiter = {
  id: string;
  firstname: string;
  lastname: string;
};

// Table Types
export type TBaseTable = {
  id: string;
  name: string;
  tableNumber: number;
  capacity: number;
  isAvailable: boolean;
  waiter: TWaiter;
  waiterId: string | null
  url: string | null;
  createdAt: string;
};

export type TTable = Omit<TBaseTable, "waiterId" >;
export type TCreateTable = Omit<TBaseTable, "id" | "createdAt" | "waiter">
export type TUpdateTable = Partial<TBaseTable> & {
  id: string;
};

export type TTableError = Partial<
  Omit<TBaseTable, "capacity" | "tableNumber" | "isAvailable">
> & {
  capacity?: string | null;
  tableNumber?: string | null;
  isAvailable?: string;
  general?: string;
};

export type TTableAllocation = {
  id: string;
  tableId: string;
  waiter: {
    id: string;
    firstname: string;
    lastname: string;
  } | null;
  allocatedAt: string;
  deallocatedAt: string | null;
};

export type TTableDB = {
  id: string;
  name: string;
  table_number: number;
  capacity: number;
  is_available: boolean;
  waiter_id: string | null;
  url: string | null;
  created_at: string;
  waiter?: {
    id: string;
    firstname: string;
    lastname: string;
  };
};

// Table Store
export type TTableUtilStore = {
  activeModal:
    | null
    | "create"
    | "delete"
    | "update"
    | "allocate"
    | "deallocate"
    | "qrcode";
  selectedTable: TTable | null;
  openCreateTableModal: () => void;
  openDeleteTableModal: () => void;
  openQRCodeModal: () => void;
  openDeallocateModal: () => void;
  openAllocateModal: () => void;
  clearSelectedTable: () => void;
  openUpdateTableModal: () => void;
  closeModal: () => void;
  setSelectedTable: (table: TTable) => void;
};
// table.ts (types)

export type TAllocationFilter = "all" | "allocated" | "unallocated";

export type TTableDataStore = {
  allTables: TTable[];
  tables: TTable[];
  searchTerm: string;
  sortBy: string;
  isLoading: boolean;
  // Loading
  startLoading: () => void;
  stopLoading: () => void;
  replaceTable: (tempId: string, data: TTable) => void
  setTables: (tables: TTable[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  changeSortBy: (sortBy: string) => void;

  // Filter
  filterTables: () => void;

  // CRUD operations
  addTable: (table: TTable) => void;
  updateTable: (table: TTable) => void;
  removeTable: (id: string) => void;
};
