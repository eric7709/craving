"use client";

import { useAuthStore } from "@/global/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function GuardCashier({ children }: Props) {
  const router = useRouter();
  const { fetchUser, user, loading } = useAuthStore();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    if (!loading && (user?.role !== "admin" && user?.role !== "cashier" )) {
      router.push("/");
    }
  }, [loading, user, fetchUser]);
  if(loading) return null
  return <>{children}</>;
}
