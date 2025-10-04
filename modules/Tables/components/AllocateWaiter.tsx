"use client";
import Modal from "@/global/components/Modal";
import React, { useState } from "react";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { useAllocateWaiter } from "../hooks/useTableServices";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { useTableDataStore } from "../store/useTableDataStore";
import { FiChevronDown } from "react-icons/fi"; // dropdown indicator

export default function AllocateWaiter() {
  const { activeModal, closeModal, selectedTable, clearSelectedTable } =
    useTableUtilStore();
  const { updateTable } = useTableDataStore();
  const { waiters } = useEmployeeDataStore();

  const [waiterId, setWaiterId] = useState("");
  const [error, setError] = useState("");

  // ✅ Sort waiters alphabetically by firstname + lastname
  const sortedWaiters = [...waiters].sort((a, b) =>
    `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`)
  );

  const waiterOptions = sortedWaiters.map((el) => ({
    label: `${el.firstname} ${el.lastname}`,
    value: el.id,
  }));

  const { mutate, isPending } = useAllocateWaiter();

  const confirm = () => {
    if (!waiterId) {
      setError("Please select a waiter.");
      return;
    }
    if (selectedTable && waiterId) {
      setError("");
      mutate(
        { tableId: selectedTable.id, waiterId },
        {
          onSuccess: (data) => {
            if (data) updateTable(data);
            clearSelectedTable();
            closeModal();
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={activeModal === "allocate"} onClose={closeModal}>
      <div className="w-72 p-6 h-fit rounded-xl bg-slate-800 shadow-lg text-center space-y-3">
        <p className="text-[13px] text-slate-300">
          Assign a waiter to Table{" "}
          <span className="font-medium text-yellow-400">
            #{selectedTable?.tableNumber} ({selectedTable?.name})
          </span>
        </p>

        {selectedTable?.waiter && (
          <p className="text-xs text-slate-400">
            Currently assigned:{" "}
            <span className="font-medium text-slate-200">
              {selectedTable.waiter.firstname} {selectedTable.waiter.lastname}
            </span>
          </p>
        )}

        {/* Waiter Selection with dropdown icon */}
        {/* Waiter Selection with dropdown icon */}
        <div className="relative text-left">
          <label className="block text-xs text-slate-300 mb-1">Waiter</label>
          <div className="relative">
            <select
              value={waiterId}
              onChange={(e) => setWaiterId(e.target.value)}
              className="w-full h-9 pl-3 pr-8 bg-slate-700 text-slate-200 
        text-sm rounded-md appearance-none border border-slate-600 
        focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select waiter...</option>
              {waiterOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {/* Dropdown indicator */}
            <FiChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-400 bg-red-900/30 p-2 rounded-md">
            {error}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 pt-1">
          <button
            onClick={closeModal}
            disabled={isPending}
            className="w-20 h-9 rounded-lg bg-slate-700 text-xs text-slate-200 
              hover:bg-slate-600 hover:scale-105 active:scale-95 
              cursor-pointer transition-transform duration-200 
              grid place-content-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={isPending}
            className={`w-24 h-9 rounded-lg text-xs text-white 
              ${
                isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 hover:scale-105"
              } 
              active:scale-95 cursor-pointer transition-transform duration-200 grid place-content-center`}
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Allocate"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
