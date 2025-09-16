import { useEffect } from 'react';
import { useAnalyticsDataStore } from '../store/useAnalyticsDataStore';

export function useAnalyticsAutoFetch() {
  const { startDate, endDate, fetchAnalytics } = useAnalyticsDataStore();

  useEffect(() => {
    console.log("Auto-fetch triggered with dates:", { startDate, endDate });
    fetchAnalytics();
  }, [startDate, endDate]); 
}