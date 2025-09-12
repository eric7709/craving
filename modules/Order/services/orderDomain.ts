import { TFilterOrders, TOrder, TOrderStatus } from "../types/order";

export type TCustomerData = {
  phoneNumber?: string;
  email: string;
  title: string;
  name: string;
};

export class OrderDomain {
  static statusConfig = (order: TOrder): Record<string, any> => {
    switch (order.status) {
      case "new":
        return {
          dot: "bg-amber-500",
          bg: "from-amber-50 to-orange-50",
          border: "border-amber-200",
          button:
            "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
          text: "New Order",
        };
      case "in progress":
        return {
          dot: "bg-blue-500",
          bg: "from-blue-50 to-indigo-50",
          border: "border-blue-200",
          button:
            "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
          text: "Preparing",
        };
      case "completed":
        return {
          dot: "bg-green-500",
          bg: "from-green-50 to-emerald-50",
          border: "border-green-200",
          button:
            "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
          text: "Ready",
        };
      case "paid":
        return {
          dot: "bg-green-500",
          bg: "from-green-50 to-pink-50",
          border: "border-green-200",
          button: "",
          text: "Completed",
        };
      case "cancelled":
        return {
          dot: "bg-red-500",
          bg: "from-red-50 to-pink-50",
          border: "border-red-200",
          button: "",
          text: "Cancelled",
        };
      default:
        return {
          dot: "bg-gray-500",
          bg: "from-gray-50 to-slate-50",
          border: "border-gray-200",
          button: "from-gray-500 to-slate-500",
          text: "Unknown",
        };
    }
  };
  static getButtonText = (order: TOrder) => {
    if (order.status === "new") return "Start Preparing";
    if (order.status === "in progress") return "Mark Complete";
    if (order.status === "completed") return "Confirm Payment";
    return "Paid";
  };

  // Change order status function
  static changeStatus = (order: TOrder, statusArg?: TOrderStatus) => {
    const currentStatus = order.status;
    let newStatus: TOrderStatus;
    if (statusArg === "cancelled") {
      newStatus = "cancelled";
    } else {
      if (currentStatus === "new") newStatus = "in progress";
      else if (currentStatus === "in progress") newStatus = "completed";
      else if (currentStatus === "completed") newStatus = "paid";
      else return; // if status is paid/cancelled, do nothing
    }
    return {
      status: newStatus,
    };
  };

  static transformOrder(order: any): TOrder {
    return {
      id: order.id,
      customer: {
        createdAt: order.customer?.created_at,
        email: order.customer?.email,
        id: order.customer?.id,
        name: order.customer?.name,
        phoneNumber: order.customer?.phone_number,
      },
      items: order.items,
      table: {
        id: order.table?.id,
        capacity: order.table?.capacity,
        createdAt: order.table?.created_at,
        name: order.table?.name,
        waiter: {
          id: order.waiter?.id,
          lastname: order.waiter?.lastname,
          firstname: order.waiter?.firstname,
        },
        url: order.table?.url,
        tableNumber: order.table?.table_number,
        isAvailable: order.table?.is_available,
      },
      tableName: order.table?.name,
      waiter: {
        id: order.waiter?.id,
        role: order.waiter?.role,
        email: order.waiter?.email,
        gender: order.waiter?.gender,
        lastname: order.waiter?.lastname,
        firstname: order.waiter?.firstname,
        isActive: order.waiter?.is_active,
        createdAt: order.waiter?.created_at,
        phoneNumber: order.waiter?.phone_number,
      },
      invoiceNumber: order.invoice_number,
      updatedAt: order.updated_at,
      total: order.total,
      status: order.status,
      orderNumber: order.order_number,
      paymentMethod: order.payment_method ?? null,
      createdAt: order.created_at,
    };
  }

  static transformOrders(orders: any[]): TOrder[] {
    return orders.map(OrderDomain.transformOrder);
  }

  // Generate invoice number
  static generateInvoiceNumber(): string {
    const timestamp = Date.now();
    const lastDigits = timestamp.toString().slice(-6);
    return `INV${lastDigits}`;
  }

  static getFilteredOrders({
    orders,
    search,
    sortBy,
    startDate,
    endDate,
  }: TFilterOrders) {
    // Filter by search (customer name, waiter name, or order id)
    let filtered = orders.filter((o) => {
      const query = search.toLowerCase();
      return (
        o.customer.name.toLowerCase().includes(query) ||
        o.waiter.firstname.toLowerCase().includes(query) ||
        o.waiter.lastname.toLowerCase().includes(query) ||
        o.id.toLowerCase().includes(query)
      );
    });

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.createdAt); // assuming createdAt is a string
        if (startDate && orderDate < new Date(startDate)) return false;
        if (endDate && orderDate > new Date(endDate)) return false;
        return true;
      });
    }

    // Sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof TOrder];
        const bValue = b[sortBy as keyof TOrder];
        // For string comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        }
        // For number comparison
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }

        return 0; // fallback
      });
    }
    return filtered;
  }
}
