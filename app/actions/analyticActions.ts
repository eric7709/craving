"use server";
import { supabase } from "@/global/lib/supabase";
import { formatDateLocal } from "@/global/utils/formatDateLocal";
import { TRestaurantAnalytics } from "@/modules/DashboardAnalytics/types/analytics";

export async function fetchAnalyticsData(
  dateFrom?: string,
  dateTo?: string,
  resultLimit: number = 10
): Promise<{ data: TRestaurantAnalytics | null; error: string | null }> {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const finalDateFrom = dateFrom || formatDateLocal(sevenDaysAgo);
    const finalDateTo = dateTo || formatDateLocal(today);
    const finalLimit = resultLimit || 7;
    const { data, error } = await supabase.rpc("get_restaurant_analytics", {
      date_from: finalDateFrom,
      date_to: finalDateTo,
      result_limit: finalLimit,
    });
    if (error) {
      return { data: null, error: error.message };
    }
    return { data: data as TRestaurantAnalytics, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
