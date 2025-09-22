"use client";

import { useOrderDataStore } from "@/modules/Order/store/useOrderDataStore";
import { useEffect, useRef } from "react";

export function usePendingOrderAlarm() {
  const { fetchOrders } = useOrderDataStore();
  const newOrdersCount = useOrderDataStore(
    (state) => state.orders.filter((el) => el.status === "new").length
  );

  const timeoutRef = useRef<number | null>(null);
  const heartbeatRef = useRef<{ dataFetch: number; audio: number } | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // ---- Play beep ----
  const playBeep = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      // Resume if suspended
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }

      const oscillator = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      oscillator.frequency.value = 1200; // Hz
      oscillator.type = "sine";

      gain.gain.value = 0.2; // volume
      oscillator.connect(gain);
      gain.connect(audioContextRef.current.destination);

      oscillator.start();
      oscillator.stop(audioContextRef.current.currentTime + 0.5); // half-second beep
    } catch (err) {
    }

    // Vibrate if supported
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // ---- Alert loop ----
  useEffect(() => {
    const startAlertLoop = () => {
      playBeep();
      if (newOrdersCount > 0) {
        timeoutRef.current = window.setTimeout(startAlertLoop, 2000);
      } else {
        timeoutRef.current = null;
      }
    };

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (newOrdersCount > 0) startAlertLoop();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [newOrdersCount]);

  // ---- Wake lock + heartbeat ----
  useEffect(() => {
    const requestWakeLock = async () => {
      if (!("wakeLock" in navigator)) return;

      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
        wakeLockRef.current.addEventListener("release", () => {
          setTimeout(requestWakeLock, 1000);
        });
      } catch (err) {
        setTimeout(requestWakeLock, 5000);
      }
    };

    const startHeartbeat = () => {
      const dataFetchInterval = window.setInterval(fetchOrders, 15000);

      // silent audio to keep context alive
      audioContextRef.current = new AudioContext();
      const audioInterval = window.setInterval(() => {
        if (audioContextRef.current?.state === "running") {
          const oscillator = audioContextRef.current.createOscillator();
          const gain = audioContextRef.current.createGain();
          gain.gain.value = 0; // silent
          oscillator.connect(gain);
          gain.connect(audioContextRef.current.destination);
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + 0.001);
        }
      }, 10000);

      heartbeatRef.current = { dataFetch: dataFetchInterval, audio: audioInterval };
    };

    requestWakeLock();
    startHeartbeat();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !wakeLockRef.current) {
        requestWakeLock();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current.dataFetch);
        clearInterval(heartbeatRef.current.audio);
      }

      if (audioContextRef.current) audioContextRef.current.close().catch(() => {});
      if (wakeLockRef.current) wakeLockRef.current.release().catch(() => {});

      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchOrders]);
}
