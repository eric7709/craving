import { Filter } from "lucide-react";
import SearchCustomer from "./SearchCustomer";
import { useState } from "react";

export default function CustomerHeader() {
  const [isOpened, setOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center h-14 pr-3 justify-end">
      {/* Desktop Search */}
      <div className="hidden lg:block">
        <SearchCustomer />
      </div>
      {/* Filter button */}
      <Filter
        className="ml-3 lg:hidden cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-14 left-0 w-full bg-white p-4 transform transition-transform duration-300 ${
          isOpened ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SearchCustomer />
      </div>
    </div>
  );
}
