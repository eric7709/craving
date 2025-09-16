import React from "react";
import { fetchAnalyticsData } from "../actions/analyticActions";

export default async function page() {
  const { data } = await fetchAnalyticsData("2025-09-15","2025-09-21", 10);
  console.log(data);
  return <div>page</div>;
}
