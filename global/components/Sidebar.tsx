"use client";
import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "../store/useUIStore";
import { useRouter, usePathname } from "next/navigation"; // ⬅️ added
import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { useUser } from "../hooks/useUser";
import { NAV_ITEMS } from "../constants/NAV";

export default function Sidebar() {
  const { sidebarOpened, closeSideBar } = useUIStore();
  const router = useRouter();
  const pathname = usePathname(); // ⬅️ active route
  const [loading, setLoading] = useState(false);
  const { userName, userRole, isLoading } = useUser();

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

  const SidebarContent = () => (
    <>
      <div className="h-14 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <h1 className="text-lg font-bold">Cravings</h1>
        <button className="lg:hidden" onClick={closeSideBar}>
          <X className="w-6 h-6 text-gray-300" />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {NAV_ITEMS.map(({ name, icon: Icon, href }) => {
          const isActive = pathname === href; // ⬅️ check active
          return (
            <Link
              key={name}
              href={href}
              onClick={closeSideBar}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "hover:bg-blue-600 text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-700">
        <Image src={"/user.png"} width={40} height={40} alt="user" />
        <div>
          <p className="text-sm font-medium">
            {isLoading ? "Loading..." : userName}
          </p>
          <p className="text-xs capitalize text-gray-400">
            {isLoading ? "Fetching role..." : userRole}
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center cursor-pointer gap-3 text-red-400 hover:text-red-500 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">
            {loading ? "Logging out..." : "Logout"}
          </span>
        </button>
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

      <aside className="hidden lg:flex lg:w-64 lg:h-screen lg:bg-slate-900 lg:text-white lg:flex-col lg:shadow-lg">
        <SidebarContent />
      </aside>
    </>
  );
}
