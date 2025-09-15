"use client";
import AdminHeader from "@/modules/Order/components/AdminHeader";
import TopMenuItems from "./TopMenuItems";
import AnalyticsHeader from "./AnalyticsHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";
import TopCategories from "./TopCategories";
import TopTables from "./TopTables";
import TopWaiters from "./TopWaiters";
import TopCustomers from "./TopCustomers";
import AnalyticsTotal from "./AnalyticsTotal";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";
import { useEffect } from "react";

export default function AnanlyticsBase() {
  const { fetchAnalytics } = useAnalyticsDataStore();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-y-auto ">
      <AdminHeader children={<AnalyticsHeader />} title="Analytics" />
      <AdminBodyContainer>
        <AnalyticsTotal />
        <TopMenuItems />
        <TopCategories />
        <TopTables />
        <TopWaiters />
        <TopCustomers />
      </AdminBodyContainer>
    </div>
  );
}
