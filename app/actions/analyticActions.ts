"use server";
import { supabase } from "@/global/lib/supabase";
import { TRestaurantAnalytics } from "@/modules/DashboardAnalytics/types/analytics";

function formatDateLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function fetchAnalyticsData(
  dateFrom?: string,
  dateTo?: string,
  resultLimit: number = 10
): Promise<{ data: TRestaurantAnalytics | null; error: string | null }> {
  try {
    console.log("=== PARAMETER DEBUG ===");
    console.log("Received parameters:", { dateFrom, dateTo, resultLimit });
    console.log("Parameter types:", {
      dateFromType: typeof dateFrom,
      dateToType: typeof dateTo,
      resultLimitType: typeof resultLimit,
    });

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const finalDateFrom = dateFrom || formatDateLocal(sevenDaysAgo);
    const finalDateTo = dateTo || formatDateLocal(today);
    const finalLimit = resultLimit || 7;

    console.log("Final parameters being sent to RPC:", {
      date_from: finalDateFrom,
      date_to: finalDateTo,
      result_limit: finalLimit,
    });

    const { data, error } = await supabase.rpc("get_restaurant_analytics", {
      date_from: finalDateFrom,
      date_to: finalDateTo,
      result_limit: finalLimit,
    });

    console.log("RPC response:", data);
    console.log("Date range:", finalDateFrom, finalDateTo);

    if (error) {
      console.error("RPC error details:", error);
      return { data: null, error: error.message };
    }
    return { data: data as TRestaurantAnalytics, error: null };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
