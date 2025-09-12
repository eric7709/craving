"use client";
import { Search } from "lucide-react";
import { useTableDataStore } from "../store/useTableDataStore";

export default function SearchTable() {
  const {searchTerm, setSearchTerm} = useTableDataStore()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  };

  return (
    <div className="relative w-[235px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search by Table or Waiter"
        className="w-full pl-[34px] pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
