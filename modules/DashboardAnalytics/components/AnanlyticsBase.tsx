"use client"
import AdminHeader from "@/modules/Order/components/AdminHeader";
import TopMenuItems from "./TopMenuItems";
import AnalyticsHeader from "./AnalyticsHeader";
import AdminBodyContainer from "@/global/components/AdminBodyContainer";

export default function AnanlyticsBase() {
  return (
    <div className="">
      <AdminHeader children={<AnalyticsHeader />} title="Analytics" />
      <AdminBodyContainer>
        <TopMenuItems />
      </AdminBodyContainer>
    </div>
  );
}
