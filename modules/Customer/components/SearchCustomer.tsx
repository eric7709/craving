"use client";
import { useCustomerDataStore } from "../store/useCustomerDataStore";

export default function SearchCustomer() {
  const { searchTerm, setSearchTerm, sortBy, setSortBy } =
    useCustomerDataStore();

  return (
    <div className="h-9 ">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search customers..."
        className="h-full w-full lg:w-auto outline-none border border-gray-300 text-sm rounded-lg pl-4"
      />
    </div>
  );
}
