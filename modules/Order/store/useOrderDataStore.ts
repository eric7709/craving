import { create } from "zustand";
import { supabase } from "@/global/lib/supabase";
import { TOrderDataStore, TFetchOrdersParams } from "../types/order";
import { fetchOrderById, fetchOrders } from "@/app/actions/orderActions";

export const useOrderDataStore = create<TOrderDataStore>((set, get) => ({
  orders: [],
  filteredOrders: [],
  isLoading: false,
  sortBy: null,
  sortDirection: "asc",
  status: "",
  search: "",
  startDate: null,
  endDate: null,
  // ======== Setters ========
  setSortDirection: (sortDirection) => set({ sortDirection }),
  setSortBy: (sortBy) => {
    set({ sortBy });
    get().filterOrders();
  },
  setStatus: (status) => {
    set({ status });
    get().fetchOrders();
    get().filterOrders();
  },
  setSearch: (search) => {
    set({ search });
    get().filterOrders();
  },
  setStartDate: (date) => {
    if (date) {
      // Handle timezone properly for Nigeria (WAT = UTC+1)
      const inputDate = new Date(date);
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth();
      const day = inputDate.getDate();

      // Create date in local timezone (Nigeria)
      const startOfDay = new Date(year, month, day, 0, 0, 0, 0);
      set({ startDate: startOfDay.toISOString() });
    } else {
      set({ startDate: null });
    }
    get().fetchOrders();
  },
  setEndDate: (date) => {
    if (date) {
      // Handle timezone properly for Nigeria (WAT = UTC+1)
      const inputDate = new Date(date);
      const year = inputDate.getFullYear();
      const month = inputDate.getMonth();
      const day = inputDate.getDate();

      // Create date in local timezone (Nigeria)
      const endOfDay = new Date(year, month, day, 23, 59, 59, 999);
      set({ endDate: endOfDay.toISOString() });
      
    } else {
      set({ endDate: null });
    }
    get().fetchOrders();
  },
  clearDateRange: () => set({ startDate: null, endDate: null }),

  getFilteredOrdersSum: () => {
    return get()
      .filteredOrders.filter((order) => order.status === "paid")
      .reduce((sum, order) => sum + order.total, 0);
  },

  // ======== Orders Manipulation ========
  setOrders: (orders) => {
    const sorted = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    set({ orders: sorted });
    get().filterOrders();
  },
  addOrder: (order) => {
    const existing = get().orders.find((o) => o.id === order.id);
    if (existing) return get().updateOrder(order);

    const newOrders = [order, ...get().orders];
    const sorted = newOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    set({ orders: sorted });
    get().filterOrders();
  },
  updateOrder: (order) => {
    const updatedOrders = get().orders.map((o) =>
      o.id === order.id ? order : o
    );
    const sorted = updatedOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    set({ orders: sorted });
    get().filterOrders();
  },
  removeOrder: (orderId) => {
    set({ orders: get().orders.filter((o) => o.id !== orderId) });
    get().filterOrders();
  },

  // ======== Fetch Orders ========
  fetchOrders: async () => {
    set({ isLoading: true });
    try {
      const params: TFetchOrdersParams = {
        startDate: get().startDate ?? undefined,
        endDate: get().endDate ?? undefined,
        status: get().status || undefined,
      };
      const fetchedOrders = await fetchOrders(params);
      const mergedOrders = [...get().orders];
      fetchedOrders.forEach((fetched) => {
        const index = mergedOrders.findIndex((o) => o.id === fetched.id);
        if (index > -1) {
          mergedOrders[index] = fetched;
        } else {
          mergedOrders.unshift(fetched);
        }
      });

      // Sort by createdAt after merging
      const sorted = mergedOrders.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      set({ orders: sorted });
      get().filterOrders();
    } catch (err) {
    } finally {
      set({ isLoading: false });
    }
  },

  // ======== Filtering & Sorting ========
  applyFilters: (orders) => {
    const { search, sortBy, sortDirection, status, startDate, endDate } = get();
    let filtered = [...orders];

    // Filter by date range first
    if (startDate || endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);

        if (startDate && endDate) {
          // Both dates provided - filter between range
          return (
            orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
          );
        } else if (startDate) {
          // Only start date - filter from start date onwards
          return orderDate >= new Date(startDate);
        } else if (endDate) {
          // Only end date - filter up to end date
          return orderDate <= new Date(endDate);
        }
        return true;
      });
    }

    // Filter by status
    if (status) {
      filtered = filtered.filter((o) => o.status === status);
    }

    // Then filter by search
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.customer?.name?.toLowerCase().includes(q) ||
          o.waiter?.firstname?.toLowerCase().includes(q) ||
          o.waiter?.lastname?.toLowerCase().includes(q) ||
          o.orderNumber?.toLowerCase().includes(q) ||
          o.invoiceNumber?.toLowerCase().includes(q) ||
          o.id.toLowerCase().includes(q)
      );
    }

    // Apply user-selected sorting if exists, otherwise sort by createdAt desc
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortBy) {
        switch (sortBy) {
          case "customerName":
            comparison = (a.customer?.name || "").localeCompare(
              b.customer?.name || ""
            );
            break;
          case "waiterName":
            comparison =
              (a.waiter?.lastname || "").localeCompare(
                b.waiter?.lastname || ""
              ) ||
              (a.waiter?.firstname || "").localeCompare(
                b.waiter?.firstname || ""
              );
            break;
          case "total":
            comparison = a.total - b.total;
            break;
          case "createdAt":
            comparison =
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            break;
          case "updatedAt":
            comparison =
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            break;
          case "status":
            comparison = (a.status || "").localeCompare(b.status || "");
            break;
        }
        return sortDirection === "asc" ? comparison : -comparison;
      } else {
        // Default sort by createdAt desc (newest first)
        comparison =
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return comparison;
      }
    });

    return filtered;
  },
  filterOrders: () => {
    set({ filteredOrders: get().applyFilters(get().orders) });
  },

  // ======== Real-Time Subscriptions ========
  subscribeToOrders: () => {
    const subscription = supabase
      .channel("orders_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        async (payload) => {
          const { eventType, new: newOrder, old: oldOrder } = payload;
          if (!newOrder && !oldOrder) return;
          if (eventType === "INSERT" && newOrder) {
            const data = await fetchOrderById(newOrder.id);
            if (data) get().addOrder(data);
          } else if (eventType === "UPDATE" && newOrder) {
            const data = await fetchOrderById(newOrder.id);
            if (data) get().updateOrder(data);
          } else if (eventType === "DELETE" && oldOrder) {
            get().removeOrder(oldOrder.id);
          }
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          get().fetchOrders();
        }
      });
    // cleanup function
    return () => {
      supabase.removeChannel(subscription);
    };
  },
}));
