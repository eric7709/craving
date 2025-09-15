"use client";
import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useAnalyticsDataStore } from "../store/useAnalyticsDataStore";

export default function AnalyticsDateDropdown() {
  const { 
    startDate, 
    endDate, 
    setDateRange, 
    fetchAnalytics,
    setThisWeek,
    setLastWeek,
    setThisMonth,
    setLastMonth,
    reset
  } = useAnalyticsDataStore();

  const [open, setOpen] = useState(false);
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync local state with store state when store changes
  useEffect(() => {
    setLocalStart(startDate);
    setLocalEnd(endDate);
  }, [startDate, endDate]);

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

  const handleApply = () => {
    console.log('=== DATE RANGE DEBUG ===');
    console.log('Local dates being applied:', { localStart, localEnd });
    setDateRange(localStart, localEnd);
    
    // Add a small delay to ensure state is updated before fetching
    setTimeout(() => {
      const currentState = useAnalyticsDataStore.getState();
      console.log('Store state after setDateRange:', { 
        startDate: currentState.startDate, 
        endDate: currentState.endDate,
        resultLimit: currentState.resultLimit
      });
      fetchAnalytics();
    }, 50);
    
    setOpen(false);
  };

  const handleQuickSelect = async (action: () => void | Promise<void>) => {
    console.log('=== QUICK SELECT DEBUG ===');
    await action(); // This updates the store's startDate and endDate
    
    const { startDate: newStart, endDate: newEnd, resultLimit } = useAnalyticsDataStore.getState();
    console.log('Quick select - Store state after action:', { 
      startDate: newStart, 
      endDate: newEnd,
      resultLimit 
    });
    
    await fetchAnalytics(); // Ensure we fetch the data with new dates
    setOpen(false);
  };

  const handleClear = async () => {
    reset(); // Use the reset method from store
    await fetchAnalytics(); // Fetch with reset dates
    setOpen(false);
  };

  // Format date range for display with consistent formatting
  const formatDateRange = () => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr + 'T00:00:00'); // Add time to avoid timezone issues
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    };

    if (startDate === endDate) {
      return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 lg:min-w-36 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer"
      >
        <Calendar className="h-4 w-4 text-gray-500" />
        <span className="truncate">{formatDateRange()}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-80 rounded-lg overflow-hidden bg-white shadow-lg border border-gray-300 z-50 right-0 p-4">
          <div className="flex flex-col gap-4">
            {/* Quick Select Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickSelect(() => {
                  setDateRange('2025-09-01', '2025-09-30');
                })}
                className="px-3 py-2 text-xs rounded-md border border-green-300 bg-green-50 hover:bg-green-100 duration-300 active:scale-95"
              >
                Test Range (Sept)
              </button>
              <button
                onClick={() => handleQuickSelect(setThisWeek)}
                className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95"
              >
                This Week
              </button>
              <button
                onClick={() => handleQuickSelect(setLastWeek)}
                className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95"
              >
                Last Week
              </button>
              <button
                onClick={() => handleQuickSelect(setThisMonth)}
                className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95"
              >
                This Month
              </button>
              <button
                onClick={() => handleQuickSelect(setLastMonth)}
                className="px-3 py-2 text-xs rounded-md border border-gray-300 hover:bg-gray-50 duration-300 active:scale-95"
              >
                Last Month
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Custom Date Range */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-medium text-gray-700">Custom Range</h3>
              
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
                  min={localStart} // Ensure end date is not before start date
                  className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Actions */}
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
                  className="px-3 py-2 duration-300 active:scale-90 text-xs cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
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