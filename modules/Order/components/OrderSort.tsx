import React from "react";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function OrderSort() {
  const { sortBy, setSortBy } = useOrderDataStore();
  const options = ["createdAt", "total", "customerName"];

  return (
    <select
      value={sortBy || ""}
      onChange={(e) => setSortBy(e.target.value)}
      className="orderHeaderInput border rounded-md px-3 py-1"
    >
      <option value="">Sort By</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  );
}
