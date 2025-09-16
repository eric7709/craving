import { create } from "zustand";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import { TAnalyticsDataStore } from "../types/analytics";
import { fetchAnalyticsData } from "@/app/actions/analyticActions";

// Enable plugins for better week handling
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const useAnalyticsDataStore = create<TAnalyticsDataStore>((set, get) => {
  // Initialize dates with Day.js - much cleaner!
  const initialStartDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD'); // Monday start
  const initialEndDate = dayjs().endOf('isoWeek').format('YYYY-MM-DD'); // Sunday end
  
  console.log("Initial date range:", { initialStartDate, initialEndDate });

  return {
    // Initial state
    analytics: null,
    startDate: initialStartDate,
    endDate: initialEndDate,
    isLoading: false,
    error: null,
    resultLimit: 10,

    // Actions
    setDateRange: (startDate: string, endDate: string) => {
      console.log("Setting date range:", { startDate, endDate });
      set({ startDate, endDate });
    },

    setResultLimit: (limit: number) => set({ resultLimit: limit }),

    fetchAnalytics: async () => {
      const { startDate, endDate, resultLimit } = get();
      console.log("Fetching analytics with:", { startDate, endDate, resultLimit });
      set({ isLoading: true, error: null });
      try {
        const { data, error } = await fetchAnalyticsData(startDate, endDate, resultLimit);
        if (error) {
          console.error("Analytics fetch error:", error);
          set({ error, isLoading: false });
          return;
        }
        console.log("Analytics data received:", data);
        set({ analytics: data, isLoading: false });
      } catch (error) {
        console.error("Analytics fetch exception:", error);
        set({
          error: error instanceof Error ? error.message : "Failed to fetch analytics",
          isLoading: false,
        });
      }
    },

    clearError: () => set({ error: null }),

    reset: async () => {
      const startDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
      console.log("Resetting to:", { startDate, endDate });
      
      set({ 
        startDate, 
        endDate, 
        analytics: null, 
        isLoading: false, 
        error: null, 
        resultLimit: 10 
      });
      await get().fetchAnalytics();
    },

    // Quick select helpers - much cleaner with Day.js!
    setThisWeek: async () => {
      const startDate = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = dayjs().endOf('isoWeek').format('YYYY-MM-DD');
      console.log("Setting this week:", { startDate, endDate });
      
      set({ startDate, endDate });
      await get().fetchAnalytics();
    },

    setLastWeek: async () => {
      const startDate = dayjs().subtract(1, 'week').startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = dayjs().subtract(1, 'week').endOf('isoWeek').format('YYYY-MM-DD');
      console.log("Setting last week:", { startDate, endDate });
      
      set({ startDate, endDate });
      await get().fetchAnalytics();
    },

    setThisMonth: async () => {
      const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
      const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
      console.log("Setting this month:", { startDate, endDate });
      
      set({ startDate, endDate });
      await get().fetchAnalytics();
    },

    setLastMonth: async () => {
      const startDate = dayjs().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
      const endDate = dayjs().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
      console.log("Setting last month:", { startDate, endDate });
      
      set({ startDate, endDate });
      await get().fetchAnalytics();
    },
  };
});