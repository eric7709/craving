"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/global/hooks/useUser";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { isLoading, userID, userRole } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Public routes that don't need authentication
  const publicRoutes = ["/auth/login", "/auth/signup", "/auth/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  )
  // Role-based route protection
  const protectedRoutes = {
    "/admin": ["admin"],
    "/cashier": ["admin", "cashier"],
    "/waiter": ["admin", "waiter"],
  };

  useEffect(() => {
    if (!isClient || isLoading) return;

    // If not authenticated and not on a public route, redirect to login
    if (!userID && !isPublicRoute) {
      router.push("/auth/login");
      return;
    }
    // If authenticated and on login page, redirect to home
    if (userID && pathname === "/auth/login") {
      router.push("/");
      return;
    }
    // Check role-based access
    if (userID && userRole) {
      for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
        if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
          router.push("/unauthorized");
          return;
        }
      }
    }
  }, [isClient, isLoading, userID, userRole, pathname, isPublicRoute, router]);
  // Show loading spinner while checking auth
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }
  if (!isPublicRoute && !userID) {
    return null;
  }
  return <>{children}</>;
}
