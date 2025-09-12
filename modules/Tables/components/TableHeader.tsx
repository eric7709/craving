import { Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { useTableDataStore } from "../store/useTableDataStore";

export default function CategoryHeader() {
  const { setSearchTerm, searchTerm } = useTableDataStore();
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <div className="">
      <div className="hidden relative lg:flex w-full justify-end h-9 text-sm text-left">
        <div className="relative w-44">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-7 h-full text-xs border-gray-300 shadow-sm outline-blue-200"
          />
        </div>
      </div>

      <Filter
        className="ml-auto lg:hidden"
        onClick={() => setMenuOpened(!menuOpened)}
        size={18}
      />
      <div
        className={`inset-0 lg:hidden flex flex-col p-4 top-14 duration-300 fixed z-40 bg-white ${
          menuOpened ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="relative flex w-full justify-end h-9 text-sm text-left">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-44 rounded-lg border px-7 h-full text-xs border-gray-300 shadow-sm outline-blue-200"
          />
        </div>
        <button
          className="py-2.5 w-full  cursor-pointer mt-auto bg-blue-500 text-white font-medium rounded-lg shadow-md"
          onClick={() => setMenuOpened(false)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
