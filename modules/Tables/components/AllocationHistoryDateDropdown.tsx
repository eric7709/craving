"use client";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useTableAllocationDataStore } from "../store/useTableAllocationDataStore";

export default function AllocationHistoryDateDropdown() {
  const { startDate, endDate, setDateRange, fetchAllocations } =
    useTableAllocationDataStore();

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
    setDateRange(localStart, localEnd);
    fetchAllocations(localStart, localEnd);
    setOpen(false);
  };

  const formatRange = () => {
    const start = dayjs(startDate).format("DD/MM/YYYY");
    const end = dayjs(endDate).format("DD/MM/YYYY");
    return start === end ? start : `${start} - ${end}`;
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 rounded border border-gray-300 px-2 py-2 bg-white text-gray-900 text-xs shadow-sm"
      >
        <Calendar className="h-3 w-3 text-gray-500" />
        <span className="truncate">{formatRange()}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-300 rounded shadow-lg p-3 z-50">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">Start</label>
              <input
                type="date"
                value={localStart}
                onChange={(e) => setLocalStart(e.target.value)}
                className="px-2 py-1 rounded border text-xs"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-600 mb-1">End</label>
              <input
                type="date"
                value={localEnd}
                min={localStart}
                onChange={(e) => setLocalEnd(e.target.value)}
                className="px-2 py-1 rounded border text-xs"
              />
            </div>
            <button
              onClick={handleApply}
              className="mt-2 px-3 py-1 rounded bg-indigo-500 text-white text-xs hover:bg-indigo-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
