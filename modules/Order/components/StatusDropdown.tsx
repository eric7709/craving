"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useOrderDataStore } from "../store/useOrderDataStore";
import { TOrderStatus } from "../types/order";
import { STATUS_OPTIONS } from "../constants/STATUS_OPTIONS";

export default function StatusDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { orders, status, setStatus } = useOrderDataStore();
  const selected =
    STATUS_OPTIONS.find((option) => option.key === status) || STATUS_OPTIONS[0];
  const getStatusCount = (key: string) => {
    if (!key) return orders.length;
    return orders.filter((o) => o.status === key).length;
  };
  const handleSelect = (option: (typeof STATUS_OPTIONS)[0]) => {
    setOpen(false);
    setStatus(option.key as TOrderStatus);
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
  return (
    <div ref={dropdownRef} className="relative inline-block text-sm text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center w-full justify-between gap-2 rounded-lg border border-gray-200 px-4 h-9 text-xs font-medium shadow-sm hover:bg-gray-50 cursor-pointer text-gray-500 lg:w-44"
      >
        <span className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${selected.color}`}></span>
          {selected.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute mt-2 lg:w-44 w-full rounded-lg overflow-hidden bg-white shadow-lg border border-gray-300 z-50 right-0">
          <ul>
            {STATUS_OPTIONS.map((option) => (
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
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${option.color}`}
                    ></span>
                    {option.label}
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    {getStatusCount(option.key)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
