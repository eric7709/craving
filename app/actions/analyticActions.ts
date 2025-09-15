import { supabase } from "@/global/lib/supabase";
import { TRestaurantAnalytics } from "@/modules/DashboardAnalytics/types/analytics";

export async function fetchAnalyticsData(
  dateFrom?: string,
  dateTo?: string,
  resultLimit: number = 10
): Promise<{ data: TRestaurantAnalytics | null; error: string | null }> {
  try {
    console.log('=== PARAMETER DEBUG ===');
    console.log('Received parameters:', { dateFrom, dateTo, resultLimit });
    console.log('Parameter types:', { 
      dateFromType: typeof dateFrom, 
      dateToType: typeof dateTo, 
      resultLimitType: typeof resultLimit 
    });
    
    // Use passed parameters, but fallback to working dates if undefined/null
    const finalDateFrom = dateFrom || '2025-09-01';
    const finalDateTo = dateTo || '2025-09-30';
    const finalLimit = resultLimit || 5;
    
    console.log('Final parameters being sent to RPC:', { 
      date_from: finalDateFrom, 
      date_to: finalDateTo, 
      result_limit: finalLimit 
    });

    const { data, error } = await supabase.rpc("get_restaurant_analytics", {
      date_from: finalDateFrom,
      date_to: finalDateTo,
      result_limit: finalLimit,
    });
    
    console.log('RPC response:', data);
    
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