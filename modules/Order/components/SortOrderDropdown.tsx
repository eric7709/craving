"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { SORT_OPTIONS } from "../constants/SORT_OPTIONS";


export default function SortOrderDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { sortBy, sortDirection, setSortBy, setSortDirection } =
    useOrderDataStore();
  const handleSelect = (
    option: (typeof SORT_OPTIONS)[0],
    direction: "asc" | "desc"
  ) => {
    setSortBy(option.key as any);
    setSortDirection(direction);
    setOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
  const selectedOption = SORT_OPTIONS.find((opt) => opt.key === sortBy);
  const selectedLabel = selectedOption
    ? `${selectedOption.label} (${sortDirection === "asc" ? "ASC" : "DESC"})`
    : "Sort by";

  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-200 lg:min-w-32 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer  w-full text-gray-500"
      >
        {selectedLabel}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute mt-2 overflow-hidden right-0 w-56 rounded-lg bg-white shadow-lg border-gray-300 border z-50">
          <ul>
            {SORT_OPTIONS.map((option) => (
              <React.Fragment key={option.key}>
                <li>
                  <button
                    onClick={() => handleSelect(option, "asc")}
                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-xs cursor-pointer transition-colors ${
                      option.key === sortBy && sortDirection === "asc"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <span>{option.label} (ASC)</span>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSelect(option, "desc")}
                    className={`flex items-center justify-between w-full px-4 py-2 text-left text-xs cursor-pointer transition-colors ${
                      option.key === sortBy && sortDirection === "desc"
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <span>{option.label} (DESC)</span>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
