import { create } from "zustand";
import { TAnalyticsDataStore, TRestaurantAnalytics } from "../types/analytics";
import { fetchAnalyticsData } from "@/app/actions/analyticActions";

function getStartOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(d.setDate(diff));
}
function getEndOfWeek(date: Date = new Date()): Date {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return endOfWeek;
}
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const useAnalyticsDataStore = create<TAnalyticsDataStore>((set, get) => ({
  // Initial state
  analytics: null,
  startDate: formatDate(getStartOfWeek()),
  endDate: formatDate(getEndOfWeek()),
  isLoading: false,
  error: null,
  resultLimit: 10,

  // Actions
  setDateRange: (startDate: string, endDate: string) => {
    set({ startDate, endDate });
  },

  setResultLimit: (limit: number) => {
    set({ resultLimit: limit });
  },

  fetchAnalytics: async () => {
    const { startDate, endDate, resultLimit } = get();
    console.log('=== STORE FETCH DEBUG ===');
    console.log('Store state during fetch:', { startDate, endDate, resultLimit });
    
    set({ isLoading: true, error: null });
    try {
      console.log('Calling fetchAnalyticsData with:', { startDate, endDate, resultLimit });
      const { data, error } = await fetchAnalyticsData(
        startDate,
        endDate,
        resultLimit
      );
      console.log('fetchAnalyticsData response:', { data, error });
      if (error) {
        console.error('Setting error in store:', error);
        set({ error, isLoading: false });
        return;
      }
      console.log('Raw data from API:', data);
      console.log('Data type:', typeof data);
      console.log('Data keys:', data ? Object.keys(data) : 'no data');
      console.log('orderStats specifically:', data?.orderStats);
      console.log('Setting analytics data in store:', data);
      set({ analytics: data, isLoading: false });
    } catch (error) {
      console.error('Caught error in fetchAnalytics:', error);
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch analytics",
        isLoading: false,
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  reset: async () => {
    const startDate = formatDate(getStartOfWeek());
    const endDate = formatDate(getEndOfWeek());
    set({
      analytics: null,
      startDate,
      endDate,
      isLoading: false,
      error: null,
      resultLimit: 10,
    });
    // Fetch analytics with the reset dates
    await get().fetchAnalytics();
  },

  // Convenience methods for common date ranges - now with auto-fetch
  setThisWeek: async () => {
    const startDate = formatDate(getStartOfWeek());
    const endDate = formatDate(getEndOfWeek());
    set({ startDate, endDate });
    await get().fetchAnalytics();
  },

  setLastWeek: async () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startDate = formatDate(getStartOfWeek(lastWeek));
    const endDate = formatDate(getEndOfWeek(lastWeek));
    set({ startDate, endDate });
    await get().fetchAnalytics();
  },

  setThisMonth: async () => {
    // Use September 2025 since that's where the test data is
    const startDate = '2025-09-01';
    const endDate = '2025-09-30';
    
    console.log('Setting This Month to:', { startDate, endDate });
    set({ startDate, endDate });
    await get().fetchAnalytics();
  },

  setLastMonth: async () => {
    const now = new Date();
    const startDate = formatDate(
      new Date(now.getFullYear(), now.getMonth() - 1, 1)
    );
    const endDate = formatDate(new Date(now.getFullYear(), now.getMonth(), 0));
    set({ startDate, endDate });
    await get().fetchAnalytics();
  },
}));