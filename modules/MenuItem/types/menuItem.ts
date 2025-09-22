import { TCategory } from "@/modules/Category/types/category";

export type TMenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  category: TCategory;
  imageUrl?: string | null;
  isAvailable: boolean;
  ingredients?: string[] | null;
};
export type TCreateMenuItem = {
  name: string;
  price: number | null;
  imageUrl?: string | null;
  description: string;
  categoryId: string;
  isAvailable: boolean;
  ingredients?: string[];
  image: File | string | null;
};
export type TUpdateMenuItem = TCreateMenuItem & {
  id: string;
};
export type TMenuItemErrors = {
  id?: string;
  name?: string;
  price?: string;
  description?: string;
  categoryId?: string;
  imageUrl?: string;
  isAvailable?: string;
  ingredients?: string;
};

type TMenuItemsWithQtyAndTakeOut = TMenuItem &{
  takeOut: boolean 
  quantity: number
}



export type TMenuItemDataStore = {
  menuItems: TMenuItem[];         // filtered list based on search/category
  allMenuItems: TMenuItem[];      // full list of menu items
  searchTerm: string;
  category: string;               // currently selected category
  isLoading: boolean;
  error: any;

  // --- Setters ---
  setSearch: (term: string) => void;
  setCategory: (category: string) => void;

  // --- Initialize ---
  setMenuItems: (items: TMenuItem[]) => void;

  // --- Realtime subscription ---
  subscribeToMenuItems: () => void;

  // --- Fetch ---
  fetchMenuItems: () => Promise<void>;

  // --- Filtering ---
  filterMenuItems: () => void;

  // --- CRUD Actions ---
  replaceMenuItem: (tempId: string, realItem: TMenuItem) => void
  addMenuItem: (item: TMenuItem) => void;
  updateMenuItem: (item: TMenuItem) => void;
  deleteMenuItem: (id: string) => void;
};


export type TMenuItemUtilStore = {
  selectedMenuItem: TMenuItem | null;
  setSelectedMenuItem: (item: TMenuItem | null) => void;

  activeModal: "update" | "delete" | "create" | null;

  openCreateModal: () => void;
  openUpdateModal: () => void;
  openDeleteModal: () => void;
  closeModal: () => void;
};
