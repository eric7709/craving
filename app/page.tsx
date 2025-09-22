"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/global/hooks/useUser";

interface User {
  isLoading: boolean;
  userID: string | null;
  userName: string | null;
  userRole: string | null;
}

export default function HomePage() {
  const { isLoading, userID, userName, userRole }: User = useUser();
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !userID) {
      router.push("/auth/login");
    }
  }, [isLoading, userID, router]);

  const handleClick = () => {
    setButtonLoading(true);
    const roleRoutes: Record<string, string> = {
      admin: "/admin",
      cashier: "/cashier",
      waiter: "/waiter",
    };
    if (userRole && roleRoutes[userRole.toLowerCase()]) {
      router.push(roleRoutes[userRole.toLowerCase()]);
    } else {
      setButtonLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-2">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!userID) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center p-2 text-gray-800">
      {/* Loader Overlay */}
      {buttonLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="w-[280px] max-w-[90vw] mx-auto text-center">
        {/* Logo */}
        <div className="mb-3 flex justify-center">
          <p className="text-[16px] font-bold text-blue-700">Cravings</p>
        </div>

        <h1 className="text-[14px] font-extrabold text-blue-900 mb-2 leading-tight">
          Streamline Your Restaurant Operations
        </h1>
        <p className="text-[9px] text-gray-600 mb-3 max-w-[240px] mx-auto">
          Manage staff, tables, orders, and more with our intuitive restaurant
          management solution.
        </p>

        <h2 className="text-[12px] font-bold text-gray-900 mb-3">
          Welcome Back, {userName || "User"}! 👋
        </h2>

        <button
          onClick={handleClick}
          disabled={buttonLoading}
          className="w-full bg-green-600 cursor-pointer duration-300 active:scale-90 text-white px-4 py-1 rounded-full text-[10px] font-semibold hover:bg-green-700 disabled:opacity-50  shadow-md"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
