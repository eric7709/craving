import { useEffect } from 'react';
import { useAnalyticsDataStore } from '../store/useAnalyticsDataStore';

export function useAnalyticsAutoFetch() {
  const { startDate, endDate, fetchAnalytics } = useAnalyticsDataStore();

  useEffect(() => {
    fetchAnalytics();
  }, [startDate, endDate]); 
}