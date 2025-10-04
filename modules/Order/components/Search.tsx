import { SearchIcon } from "lucide-react";

import { FaTimes } from "react-icons/fa";
import { useMenuItemDataStore } from "@/modules/MenuItem/store/useMenuItemDataStore";


export default function Search() {
  const {searchTerm, setSearch} = useMenuItemDataStore()
  return (
    <div className=" px-3 py-2">
      <div className="h-10 shadow shadow-gray-500 relative bg-white rounded-full border px-3 duration-300 placeholder:text-sm text-base w-full ">
        <SearchIcon
          size={17}
          className="absolute text-orange-400 bg-white left-3 -translate-y-1/2 top-1/2"
        />
        <input
          type="text"
          className="h-full w-full px-6 capitalize bg-transparent text-gray-600 font-medium text-sm border-none outline-none"
          value={searchTerm}
          placeholder="Search Menu Items"
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchTerm.trim().length > 0 && (
          <FaTimes
            onClick={() => setSearch("")}
            size={17}
            className="absolute bg-white cursor-pointer right-3 -translate-y-1/2 top-1/2"
          />
        )}
      </div>
    </div>
  );
}
