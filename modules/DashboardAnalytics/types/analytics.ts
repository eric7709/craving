// Individual item types (as you already have them)
export type TTopTable = {
  id: string;
  name: string;
  waiter: string;
  timesOrdered: number;
  revenueGenerated: number;
  percentageRevenue: number;
};

export type TTopWaiter = {
  id: string;
  name: string;
  tablesServed: number;
  ordersTaken: number;
  revenueGenerated: number;
  percentageRevenue: number;
};

export type TTopMenuItem = {
  id: string;
  name: string;
  category: string;
  timesOrdered: number;
  revenueGenerated: number;
  percentageRevenue: number;
  imageUrl?: string;
};

export type TTopCategory = {
  id: string;
  name: string;
  timesOrdered: number;
  revenueGenerated: number;
  percentageRevenue: number;
};

export type TTopCustomer = {
  id: string;
  name: string;
  ordersPlaced: number;
  totalSpent: number;
  lastVisit: string;
  percentageRevenue: number;
};

export type TRestaurantAnalytics = {
  topTables: TTopTable[];
  topWaiters: TTopWaiter[];
  topMenuItems: TTopMenuItem[];
  topCategories: TTopCategory[];
  topCustomers: TTopCustomer[];
  orderStats: [number, number, number, number]; // [cancelled, paid, newCustomers, totalRevenue]
};

// Alternative with more descriptive tuple type
export type TOrderStats = [
  cancelledOrders: number,
  paidOrders: number, 
  newCustomers: number,
  totalRevenue: number
];

export type TRestaurantAnalyticsWithNamedStats = {
  topTables: TTopTable[];
  topWaiters: TTopWaiter[];
  topMenuItems: TTopMenuItem[];
  topCategories: TTopCategory[];
  topCustomers: TTopCustomer[];
  orderStats: TOrderStats;
};


export type TAnalyticsDataStore = {
  // Data
  analytics: TRestaurantAnalytics | null;
  // Date range
  startDate: string;
  endDate: string;

  // UI state
  isLoading: boolean;
  error: string | null;
  resultLimit: number;

  // Actions
  setDateRange: (startDate: string, endDate: string) => void;
  setResultLimit: (limit: number) => void;
  fetchAnalytics: () => Promise<void>;
  clearError: () => void;
  reset: () => void;

  setThisWeek: () => void;
  setLastWeek: () => void;
  setThisMonth: () => void;
  setLastMonth: () => void;
}