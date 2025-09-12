import { create } from "zustand";
import { TOrderUtilStore, TMenuItemsWithQtyAndTakeOut } from "../types/order";
import { TTable } from "@/modules/Tables/types/table";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import { formatPrice } from "@/global/utils/formatPrice"; // Make sure this exists

export const useOrderUtilStore = create<TOrderUtilStore>((set, get) => ({
  // --- Modal & Table ---
  activeModal: null,
  selectedTable: null,

  setSelectedTable: (table: TTable) => set({ selectedTable: table }),
  clearSelectedTable: () => set({ selectedTable: null }),

  openSuccessModal: () => set({ activeModal: "success" }),
  openCreateCustomerModal: () => set({ activeModal: "customer" }),
  openOrderSummaryModal: () => set({ activeModal: "summary" }),
  closeModal: () => set({ activeModal: null }),

  isSummaryModalOpen: () => get().activeModal === "summary",
  isCustomerModalOpen: () => get().activeModal === "customer",

  // --- Cart Management ---
  selectedItems: [],
  clearSelectedItem: () => set({ selectedItems: [] }),
  addToCart: (item: TMenuItem) =>
    set((state) => {
      const exists = state.selectedItems.find((i) => i.id === item.id);
      if (exists) return state;
      return {
        selectedItems: [
          ...state.selectedItems,
          {
            ...item,
            quantity: 1,
            takeOut: false,
          } as TMenuItemsWithQtyAndTakeOut,
        ],
      };
    }),
  removeFromCart: (id: string) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((item) => item.id !== id),
    })),
  increaseQuantity: (id: string) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decreaseQuantity: (id: string) =>
    set((state) => ({
      selectedItems: state.selectedItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
  toggleTakeOut: (id: string) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === id ? { ...item, takeOut: !item.takeOut } : item
      ),
    })),

  // --- Utility functions ---
  existsInCart: (id: string): boolean =>
    get().selectedItems.some((item) => item.id === id),

  getItemFromCart: (id: string): TMenuItemsWithQtyAndTakeOut | undefined =>
    get().selectedItems.find((item) => item.id === id),

  // --- Cart Totals ---
  total: () =>
    get().selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),

  formattedTotal: () => formatPrice(get().total()),
}));
