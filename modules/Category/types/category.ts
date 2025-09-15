export type TCategory = {
  id: string;
  name: string;
};

export type TCreateCategory = {
  name: string;
};
export type TUpdateCategory = {
  id: string;
  name: string;
};

export type TCategoryError = Partial<TCategory>;

export type TCategoryUtilStore = {
  selectedCategory: TCategory | null;
  setSelectedCategory: (category: TCategory | null) => void;
  clearSelectedCategory: () => void;
  activeModal: null | "delete";
  openDeleteModal: () => void;
  closeModal: () => void;
};

export type TCategoryDataStore = {
  categories: TCategory[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;

  // CRUD operations
  setCategories: (categories: TCategory[]) => void;
  addCategory: (category: TCategory) => void;
  updateCategory: (category: TCategory) => void;
  deleteCategory: (id: string) => void;
  replaceCategory: (tempId: string, realItem: TCategory) => void
  // Search
  setSearchTerm: (term: string) => void;
  filteredCategories: () => TCategory[];

  // Loading & error
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};
