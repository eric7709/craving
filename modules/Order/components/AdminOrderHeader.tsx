"use client";
import { useState } from "react";
import NewProgressCompleted from "./NewProgressCompleted";
import DateRangeDropdown from "./OrderDateDropdown";
import OrderSearch from "./OrderSearch";
import SortOrderDropdown from "./SortOrderDropdown";
import StatusDropdown from "./StatusDropdown";
import { Filter } from "lucide-react";
import { formatPrice } from "@/global/utils/formatPrice";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function AdminOrderHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getFilteredOrdersSum } = useOrderDataStore();
  const total = formatPrice(getFilteredOrdersSum());
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="hidden lg:block"></div>
      <div className="hidden gap-2 lg:flex">
        <OrderSearch />
        <StatusDropdown />
        <SortOrderDropdown />
        <DateRangeDropdown />
      </div>
      <div className="ml-4 lg:block hidden font-semibold text-gray-900">
        {total}
      </div>
      <Filter
        className="lg:hidden ml-auto"
        size={18}
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <div
        className={`fixed z-50 lg:hidden gap-5 p-5 flex flex-col left-0 right-0 top-14 duration-300 bottom-0 bg-white ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <OrderSearch />
        <StatusDropdown />
        <SortOrderDropdown />
        <DateRangeDropdown />
        <NewProgressCompleted />
        <div className="text-center lg:hidden font-semibold text-gray-900">
          {total}
        </div>
        <button
          className="py-2.5 cursor-pointer mt-auto bg-blue-500 text-white font-medium rounded-lg shadow-md"
          onClick={() => setMenuOpen(false)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
