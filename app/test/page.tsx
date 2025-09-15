import React from "react";
import { fetchAnalyticsData } from "../actions/analyticActions";

export default async function page() {
  const { data } = await fetchAnalyticsData();
  return <div>page</div>;
}
