"use client";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import AnalyticsHeader from "@/modules/DashboardAnalytics/components/AnalyticsHeader";
import AnalyticsMetrics from "@/modules/DashboardAnalytics/components/AnalyticsMetrics";
import TopCategories from "@/modules/DashboardAnalytics/components/TopCategories";
import TopCustomers from "@/modules/DashboardAnalytics/components/TopCustomers";
import TopMenuItems from "@/modules/DashboardAnalytics/components/TopMenuItems";
import TopTables from "@/modules/DashboardAnalytics/components/TopTables";
import TopWaiters from "@/modules/DashboardAnalytics/components/TopWaiters";
import { useAnalyticsAutoFetch } from "@/modules/DashboardAnalytics/hooks/useAutoFetch";
import AdminHeader from "@/modules/Order/components/AdminHeader";

export default function Base() {
  useAnalyticsAutoFetch();
  return (
    <div className="h-screen flex flex-col overflow-y-auto ">
      <AdminHeader children={<AnalyticsHeader />} title="Analytics" />
      <AdminBodyContainer>
        <AnalyticsMetrics />
        <TopMenuItems />
        <TopCategories />
        <TopTables />
        <TopWaiters />
        <TopCustomers />
      </AdminBodyContainer>
    </div>
  );
}
