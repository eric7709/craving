"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function AnalyticsDateDropdown() {
  const {
    startDate,
    endDate,
    setDateRange,
    setThisWeek,
    setLastWeek,
    setThisMonth,
    setLastMonth,
    reset,
  } = useAnalyticsDataStore();

  const [open, setOpen] = useState(false);
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalStart(startDate);
    setLocalEnd(endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleApply = () => {
    setDateRange(localStart, localEnd); // Auto-fetch triggers
    setOpen(false);
  };

  const handleQuickSelect = (action: () => void) => {
    action(); // Auto-fetch triggers
    setOpen(false);
  };

  const handleClear = () => {
    reset(); // Auto-fetch triggers
    setOpen(false);
  };

  const formatDateRange = () => {
    try {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      if (!start.isValid() || !end.isValid()) return "Invalid Date Range";
      const formatStr = "DD/MM/YYYY";
      if (start.isSame(end, "day")) return start.format(formatStr);
      return `${start.format(formatStr)} - ${end.format(formatStr)}`;
    } catch {
      return "Invalid Date Range";
    }
  };

  const isValidDateRange = () => {
    if (!localStart || !localEnd) return false;
    const start = dayjs(localStart);
    const end = dayjs(localEnd);
    return start.isValid() && end.isValid() && (start.isSame(end) || start.isBefore(end));
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 lg:min-w-36 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer"
      >
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="truncate">{formatDateRange()}</span>
      </button>

      {open && (
        <div className="absolute mt-2 w-80 rounded-lg overflow-hidden bg-white shadow-lg border border-gray-300 z-50 right-0 p-4">
          <div className="flex flex-col gap-4">
            {/* Quick select buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  handleQuickSelect(() => {
                    const today = dayjs().format("YYYY-MM-DD");
                    setDateRange(today, today);
                  })
                }
                className="px-3 py-2 text-xs rounded-md border border-blue-300 bg-blue-50 hover:bg-blue-100 duration-300 active:scale-95"
              >
                Today
              </button>
              <button
                onClick={() =>
                  handleQuickSelect(() => {
                    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
                    setDateRange(yesterday, yesterday);
                  })
                }
                className="px-3 py-2 text-xs rounded-md border border-blue-300 bg-blue-50 hover:bg-blue-100 duration-300 active:scale-95"
              >
                Yesterday
              </button>
              <button
                onClick={() =>
                  handleQuickSelect(() => {
                    const start = dayjs().subtract(7, "days").format("YYYY-MM-DD");
                    const end = dayjs().format("YYYY-MM-DD");
                    setDateRange(start, end);
                  })
                }
                className="px-3 py-2 text-xs rounded-md border border-blue-300 bg-blue-50 hover:bg-blue-100 duration-300 active:scale-95"
              >
                Last 7 Days
              </button>
              <button
                onClick={() =>
                  handleQuickSelect(() => {
                    const start = dayjs().subtract(30, "days").format("YYYY-MM-DD");
                    const end = dayjs().format("YYYY-MM-DD");
                    setDateRange(start, end);
                  })
                }
                className="px-3 py-2 text-xs rounded-md border border-blue-300 bg-blue-50 hover:bg-blue-100 duration-300 active:scale-95"
              >
                Last 30 Days
              </button>
              <button onClick={() => handleQuickSelect(setThisWeek)} className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95">
                This Week
              </button>
              <button onClick={() => handleQuickSelect(setLastWeek)} className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95">
                Last Week
              </button>
              <button onClick={() => handleQuickSelect(setThisMonth)} className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95">
                This Month
              </button>
              <button onClick={() => handleQuickSelect(setLastMonth)} className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95">
                Last Month
              </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Custom date range */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-medium text-gray-700">Custom Range</h3>
              <div className="flex flex-col text-xs">
                <label className="mb-1 font-medium text-gray-600">Start Date</label>
                <input
                  type="date"
                  value={localStart}
                  onChange={(e) => setLocalStart(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col text-xs">
                <label className="mb-1 font-medium text-gray-600">End Date</label>
                <input
                  type="date"
                  value={localEnd}
                  onChange={(e) => setLocalEnd(e.target.value)}
                  min={localStart}
                  className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {!isValidDateRange() && (
                <p className="text-red-500 text-xs">Please select a valid date range</p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-between pt-2">
              <button
                onClick={handleClear}
                className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Reset to This Week
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={!isValidDateRange()}
                  className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
