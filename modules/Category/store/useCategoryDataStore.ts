import { create } from "zustand";
import { TCategoryDataStore } from "../types/category";

export const useCategoryDataStore = create<TCategoryDataStore>((set, get) => ({
  categories: [],
  searchTerm: "",
  isLoading: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // CRUD operations
  addCategory: (category) => {
    const { categories } = get();
    const exists = categories.some((c) => c.id === category.id);
    if (!exists) {
      set({ categories: [category, ...categories] });
    } else {
      console.warn(`Category with id ${category.id} already exists.`);
    }
  },

  updateCategory: (category) => {
    const { categories } = get();
    set({
      categories: categories.map((c) => (c.id === category.id ? category : c)),
    });
  },

  deleteCategory: (id) => {
    const { categories } = get();
    set({ categories: categories.filter((c) => c.id !== id) });
  },

  // **Filter by search term**
  filteredCategories: () => {
    const { categories, searchTerm } = get();
    if (!searchTerm.trim()) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },
}));
