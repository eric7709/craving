"use client";
import React from "react";
import { Search } from "lucide-react";
import { useOrderDataStore } from "../store/useOrderDataStore";

type Props = {
  width?: string
}

export default function OrderSearch(width: Props) {
  
  const { search, setSearch } = useOrderDataStore();

  return (
    <div className="relative h-9 inline-block text-sm text-left">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full lg:w-44 rounded-lg border px-7 h-full text-xs border-gray-300 shadow-sm outline-blue-200"
      />
    </div>
  );
}
