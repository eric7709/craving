import { create } from "zustand";
import { TMenuItem, TMenuItemDataStore } from "../types/menuItem";
import { supabase } from "@/global/lib/supabase";
import { getMenuItemById } from "@/app/actions/menuItemActions";

export const useMenuItemDataStore = create<TMenuItemDataStore>((set, get) => ({
  menuItems: [],
  allMenuItems: [],
  searchTerm: "",
  category: "all",
  isLoading: false,
  error: null,
  // --- Setters ---
  setSearch: (term: string) => {
    set({ searchTerm: term });
    get().filterMenuItems();
  },
  setCategory: (category: string) => {
    set({ category });
    get().filterMenuItems();
  },

  // --- Initialize ---
  setMenuItems: (items: TMenuItem[]) => {
    set({ allMenuItems: items });
    get().filterMenuItems(); 
  },

  // --- Realtime subscription ---
  subscribeToMenuItems: () => {
    supabase
      .channel("menu-items")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        async (payload) => {
          if (payload.eventType === "INSERT") {
            const data = await getMenuItemById(payload.new.id);
            if (data) get().addMenuItem(data);
          } else if (payload.eventType === "UPDATE") {
            const data = await getMenuItemById(payload.new.id);
            if (data) get().updateMenuItem(data);
          } else if (payload.eventType === "DELETE") {
            get().deleteMenuItem(payload.old.id);
          }
        }
      )
      .subscribe();
  },

  // --- Fetch ---
  fetchMenuItems: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.from("menu_items").select("*");
      if (error) throw error;
      set({ allMenuItems: data || [] });
      get().filterMenuItems();
    } catch (err) {
      set({ error: err });
    } finally {
      set({ isLoading: false });
    }
  },

  // --- Filtering ---
  filterMenuItems: () => {
    const { allMenuItems, searchTerm, category } = get();
    let filtered = allMenuItems.slice();

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category !== "all") {
      filtered = filtered.filter(
        (item) => item?.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }
    set({ menuItems: filtered });
  },

  replaceMenuItem: (tempId, realItem) =>
  set((state) => {
    const exists = state.menuItems.find((item) => item.id === tempId);
    if (!exists) {
      return { menuItems: [...state.menuItems, realItem] };
    } 
    return {
      menuItems: state.menuItems.map((item) =>
        item.id === tempId ? realItem : item
      ),
    };
  }),

  // --- CRUD Actions ---
  addMenuItem: (item: TMenuItem) =>
    set((state) => ({
      allMenuItems: state.allMenuItems.find((i) => i.id === item.id)
        ? state.allMenuItems
        : [item, ...state.allMenuItems],
      menuItems: state.menuItems.find((i) => i.id === item.id)
        ? state.menuItems
        : [item, ...state.menuItems],
    })),

  updateMenuItem: (item: TMenuItem) =>
    set((state) => ({
      allMenuItems: state.allMenuItems.map((i) =>
        i.id === item.id ? item : i
      ),
      menuItems: state.menuItems.map((i) => (i.id === item.id ? item : i)),
    })),

  deleteMenuItem: (id: string) =>
    set((state) => ({
      allMenuItems: state.allMenuItems.filter((i) => i.id !== id),
      menuItems: state.menuItems.filter((i) => i.id !== id),
    })),
}));
