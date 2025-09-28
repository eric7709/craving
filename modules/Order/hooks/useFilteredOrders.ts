import { useEffect, useMemo } from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";

export type SortBy =
  | "customerName"
  | "waiterName"
  | "total"
  | "createdAt"
  | "updatedAt"
  | "status"
  | null;

interface FilterParams {
  search?: string;
  status?: string;
  startDate?: string | null;
  endDate?: string | null;
  sortBy?: SortBy;
  sortDirection?: "asc" | "desc";
}

/** Keeps the store updated with filtered + sorted orders */
export const useFilteredOrders = ({
  search = "",
  status = "",
  startDate = null,
  endDate = null,
  sortBy = null,
  sortDirection = "asc",
}: FilterParams = {}) => {
  const { rawOrders, setOrders } = useOrderDataStore();

  const filtered = useMemo(() => {
    let result = [...rawOrders];

    // Filter by date range
    if (startDate || endDate) {
      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          (!startDate || orderDate >= new Date(startDate)) &&
          (!endDate || orderDate <= new Date(endDate))
        );
      });
    }

    // Filter by status
    if (status) {
      result = result.filter((o) => o.status === status);
    }

    // Filter by search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((o) =>
        [
          o.customer?.name,
          o.waiter?.firstname,
          o.waiter?.lastname,
          o.orderNumber,
          o.invoiceNumber,
          o.id,
        ].some((field) => field?.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (!sortBy) {
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
      }
      let comparison = 0;
      switch (sortBy) {
        case "customerName":
          comparison = (a.customer?.name || "").localeCompare(
            b.customer?.name || ""
          );
          break;
        case "waiterName":
          comparison =
            (a.waiter?.lastname || "").localeCompare(b.waiter?.lastname || "") ||
            (a.waiter?.firstname || "").localeCompare(b.waiter?.firstname || "");
          break;
        case "total":
          comparison = a.total - b.total;
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime();
          break;
        case "updatedAt":
          comparison =
            new Date(a.updatedAt).getTime() -
            new Date(b.updatedAt).getTime();
          break;
        case "status":
          comparison = (a.status || "").localeCompare(b.status || "");
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [rawOrders, search, status, startDate, endDate, sortBy, sortDirection]);

  // keep store.orders in sync with filtered
  useEffect(() => {
    setOrders(filtered);
  }, [filtered, setOrders]);

  return filtered;
};


export const useFilteredOrdersSum = (params: FilterParams = {}) => {
  const filteredOrders = useFilteredOrders(params);
  return useMemo(
    () =>
      filteredOrders
        .filter((order) => order.status === "paid")
        .reduce((sum, order) => sum + order.total, 0),
    [filteredOrders]
  );
};