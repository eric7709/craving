"use client";
import { useState, useRef, useEffect } from "react";
import NewProgressCompleted from "./NewProgressCompleted";
import OrderSearch from "./OrderSearch";
import SortOrderDropdown from "./SortOrderDropdown";
import StatusDropdown from "./StatusDropdown";
import { UserCircle, Filter } from "lucide-react";
import { formatPrice } from "@/global/utils/formatPrice";
import { supabase } from "@/global/lib/supabase";
import { AiOutlineLogout } from "react-icons/ai";
import { useUser } from "@/global/hooks/useUser";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function CashierHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const {getFilteredOrdersSum} = useOrderDataStore()
  const total = formatPrice(getFilteredOrdersSum())
  const { userName, userRole, isLoading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login"; 
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 bg-gray-50 gap-2 lg:gap-0">
        <div className="flex items-center justify-between w-full gap-3">
          <div className="relative flex items-center gap-3" ref={profileRef}>
            <UserCircle
              className="w-8 h-8 lg:w-10 lg:h-10 text-gray-600 flex-shrink-0 cursor-pointer"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            <div className="flex flex-col ">
              <p className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
                {userName}
              </p>
              <span className="text-[10px] -translate-y-1 italic sm:text-xs rounded-full text-green-800 font-medium w-max">
                {userRole}
              </span>
            </div>
            <div
              className={`absolute top-12 right-0 bg-red-500 text-white cup border-2 border-white rounded-full py-2 duration-300 active:scale-90 cursor-pointer shadow-lg z-50 left-2 hover:scale-[1.02] flex flex-col ${
                profileOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <button
                className="flex items-center cursor-pointer gap-2 px-4 text-[13px] font-medium rounded-t-lg"
                onClick={handleLogout}
              >
                <AiOutlineLogout size={18} className="stroke-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="lg:flex gap-2 items-center hidden">
            <OrderSearch />
            <StatusDropdown />
            <SortOrderDropdown />
          </div>

          <div className="flex items-center gap-5">
            <NewProgressCompleted />
            <p className="font-semibold hidden lg:block">{total}</p>
          </div>

          <Filter
            className="lg:hidden"
            size={18}
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed z-50 gap-5 p-5 flex flex-col left-0 right-0 top-14 duration-300 bottom-0 bg-white ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <OrderSearch />
        <StatusDropdown />
        <SortOrderDropdown />
        <NewProgressCompleted />
        <p className="font-semibold">{total}</p>
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
