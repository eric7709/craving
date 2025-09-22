"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/global/hooks/useUser";

interface User {
  isLoading: boolean;
  userID: string | null;
  userName: string | null;
  userRole: string | null;
}

export function useAuthGuard(allowedRoles: string[], protectedPath: string) {
  const { isLoading, userID, userRole }: User = useUser();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  useEffect(() => {
    if (isLoading) return;
    setIsChecking(false);
    if (!userID) {
      router.push("/auth/login");
      return;
    }

    const role = userRole?.toLowerCase() || "";

    if (!allowedRoles.includes(role)) {
      router.push("/unauthorized");
    }
  }, [isLoading, userID, userRole, router, allowedRoles, protectedPath]);

  return { isChecking };
}