import { supabase } from "@/global/lib/supabase";
import React from "react";
import DashboardPage from "../../../modules/DashboardAnalytics/components/Dashboard";
import { fetchLast5Orders } from "@/app/actions/orderActions";

export default async function page() {
  const { data, error } = await supabase.rpc("get_restaurant_dashboard");
  const recentOrders = await fetchLast5Orders();
  if (error) throw Error(error.message);
  return <DashboardPage data={data} orders={recentOrders} />;
}
