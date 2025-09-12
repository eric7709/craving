"use client";

import { useAuthStore } from "@/global/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function GuardAdmin({ children }: Props) {
  const router = useRouter();
  const { fetchUser, user, loading } = useAuthStore();

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Only redirect AFTER loading finishes
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login"); // safer than push
      } else if (user.role !== "admin") {
        router.replace("/auth/login");
      }
    }
  }, [loading, user, router]);

  // Block render until we know the user's status
  if (loading) return <div className="p-4">Checking access...</div>;
  if (!user || user.role !== "admin") return null; // extra safety

  return <>{children}</>;
}
