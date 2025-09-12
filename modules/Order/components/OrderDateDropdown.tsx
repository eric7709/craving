"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useOrderDataStore } from "../store/useOrderDataStore";

export default function DateRangeDropdown() {
  const { startDate, endDate, setStartDate, setEndDate, clearDateRange, fetchOrders } =
    useOrderDataStore();
    
  const [open, setOpen] = useState(false);
  const [localStart, setLocalStart] = useState<string>(startDate ? startDate.slice(0, 10) : "");
  const [localEnd, setLocalEnd] = useState<string>(endDate ? endDate.slice(0, 10) : "");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const applyDates = () => {
    setStartDate(localStart || null);
    setEndDate(localEnd || null);
    setOpen(false);
    fetchOrders();
  };

  const clearDates = () => {
    setLocalStart("");
    setLocalEnd("");
    clearDateRange();
    fetchOrders();
    setOpen(false);
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    // Compare just the date parts (ignore time)
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return "Today";
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return "Yesterday";
    } else {
      // Format as MM/DD/YYYY or your preferred format
      return date.toLocaleDateString();
    }
  };

  // Determine placeholder text
  let placeholderText = "Filter by date";
  if (localStart && localEnd) {
    if (localStart === localEnd) {
      // Single date selection - show "Today", "Yesterday", or actual date
      placeholderText = formatDateForDisplay(localStart);
    } else {
      // Date range - show start → end
      const startDisplay = formatDateForDisplay(localStart);
      const endDisplay = formatDateForDisplay(localEnd);
      placeholderText = `${startDisplay} → ${endDisplay}`;
    }
  } else if (localStart) {
    // Only start date
    placeholderText = `From ${formatDateForDisplay(localStart)}`;
  } else if (localEnd) {
    // Only end date
    placeholderText = `Until ${formatDateForDisplay(localEnd)}`;
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 lg:min-w-36 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer"
      >
        <Calendar className="h-4 w-4 text-gray-500" />
        {placeholderText}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-72 rounded-lg overflow-hidden bg-white shadow-lg border border-gray-300 z-50 right-0 p-4">
          <div className="flex flex-col gap-3">
            {/* Start Date */}
            <div className="flex flex-col text-xs">
              <label className="mb-1 font-medium text-gray-600">Start Date</label>
              <input
                type="date"
                value={localStart}
                onChange={(e) => setLocalStart(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col text-xs">
              <label className="mb-1 font-medium text-gray-600">End Date</label>
              <input
                type="date"
                value={localEnd}
                onChange={(e) => setLocalEnd(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={clearDates}
                className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={applyDates}
                className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}