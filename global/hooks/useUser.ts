"use client";
import { useState, useEffect, useCallback } from "react";

export function useUser() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [profileID, setProfileID] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/me", {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setUserName(data.user?.name ?? null);
      setUserRole(data.user?.role ?? null);
      setUserID(data.user?.userID ?? null);
      setProfileID(data.user?.profileID ?? null);
      setUserEmail(data.user?.email ?? null);
    } catch (err) {
      setUserName(null);
      setUserRole(null);
      setProfileID(null);
      setUserID(null);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refreshUser = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return { 
    userName, 
    userRole, 
    profileID,
    userID, 
    userEmail,
    isLoading, 
    refreshUser 
  };
}