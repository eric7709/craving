"use client";
import { useUser } from "@/global/hooks/useUser";
import { supabase } from "@/global/lib/supabase";
import { UserCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

export default function WaiterHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { userName, userRole, isLoading } = useUser();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

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

  const navLinks = [
    { label: "My Orders", href: "/waiter" },
    { label: "My Tables", href: "/waiter/tables" },
  ];
  return (
    <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between lg:justify-between">
      {/* Left: Profile */}
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

      {/* Right: Navigation */}
      <div className="lg:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="hidden lg:flex gap-3">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1 rounded-md font-medium text-sm transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col gap-2 p-4 shadow-md lg:hidden z-50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setMenuOpen(false)} // close menu on click
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
