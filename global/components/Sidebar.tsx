"use client";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X, ChevronDown } from "lucide-react";
import { useUIStore } from "../store/useUIStore";
import { NAV_ITEMS } from "../constants/NAV_ITEMS";
import { supabase } from "../lib/supabase";
import { useUser } from "../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { sidebarOpened, closeSideBar } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { userName, userRole, isLoading } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="h-14 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <h1 className="text-lg font-bold">Cravings</h1>
        <button className="lg:hidden" onClick={closeSideBar}>
          <X className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {NAV_ITEMS.map(({ name, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              onClick={closeSideBar}
              className={`flex items-center duration-300 gap-3 px-3 py-1.5 rounded-md ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-600 text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[13px] font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile Section */}
      <div className="relative" ref={profileRef}>
        <button
          className="w-full flex items-center gap-2 px-6 py-2 border-t border-slate-700 hover:bg-slate-800"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          <Image src={"/user.png"} width={30} height={30} alt="user" />
          <div className="flex-1 text-left">
            <p className="text-[13px] font-medium">
              {isLoading ? "Loading..." : userName}
            </p>
            <p className="text-[11px] capitalize text-gray-400">
              {isLoading ? "Fetching role..." : userRole}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 cursor-pointer left-4 right-4 bg-red-600 border border-red-700 rounded-md shadow-lg overflow-hidden z-50"
            >
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-700"
              >
                <LogOut className="w-4 h-4" />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpened && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSideBar}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-56 h-full bg-slate-900 text-white flex flex-col shadow-lg z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:h-screen lg:bg-slate-900 lg:text-white lg:flex-col lg:shadow-lg">
        <SidebarContent />
      </aside>
    </>
  );
}
