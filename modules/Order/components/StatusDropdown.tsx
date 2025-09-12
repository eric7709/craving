"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { TOrderStatus } from "../types/order";

// Status options + color map
const statusOptions = [
  { key: "", label: "All", color: "bg-gray-400" },
  { key: "new", label: "New", color: "bg-purple-400" },
  { key: "in progress", label: "In Progress", color: "bg-yellow-400" },
  { key: "completed", label: "Completed", color: "bg-blue-500" },
  { key: "cancelled", label: "Cancelled", color: "bg-red-500" },
  { key: "paid", label: "Paid", color: "bg-green-500" },
];

export default function StatusDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get current status from store and use it to determine selected option
  const { orders, status, setStatus } = useOrderDataStore();
  
  // Find the selected option based on the current status from store
  const selected = statusOptions.find(option => option.key === status) || statusOptions[0];

  // Compute count for each status
  const getStatusCount = (key: string) => {
    if (!key) return orders.length; // "All" case
    return orders.filter((o) => o.status === key).length;
  };

  const handleSelect = (option: typeof statusOptions[0]) => {
    console.log("StatusDropdown: Selected option:", option);
    console.log("StatusDropdown: Setting status to:", option.key);
    
    setOpen(false);
    setStatus(option.key as TOrderStatus);
    
    // Debug: Check if status was actually set
    setTimeout(() => {
      console.log("StatusDropdown: Status after set:", useOrderDataStore.getState().status);
    }, 100);
  };

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Debug effect to log status changes
  useEffect(() => {
    console.log("StatusDropdown: Current status from store:", status);
    console.log("StatusDropdown: Selected option:", selected);
  }, [status, selected]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center w-full justify-between gap-2 rounded-lg border border-gray-200 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer text-gray-500 lg:w-44"
      >
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${selected.color}`}></span>
          {selected.label}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 lg:w-44 w-full rounded-lg overflow-hidden bg-white shadow-lg border border-gray-300 z-50 right-0">
          <ul>
            {statusOptions.map((option) => (
              <li key={option.key}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-xs cursor-pointer transition-colors ${
                    option.key === selected.key
                      ? "bg-gray-100 font-medium text-gray-700"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${option.color}`}></span>
                    {option.label}
                  </span>
                  <span className="text-gray-400 text-[10px]">{getStatusCount(option.key)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}