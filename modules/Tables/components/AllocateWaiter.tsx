"use client";
import Modal from "@/global/components/Modal";
import React, { useEffect, useState } from "react";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { Field } from "@/global/components/Field";
import { useAllocateWaiter } from "../hooks/useTableServices";
import { useEmployeeDataStore } from "@/modules/Employees/store/useEmployeeDataStore";
import { toast } from "react-toast";
import { useTableDataStore } from "../store/useTableDataStore";

export default function AllocateWaiter() {
  const { activeModal, closeModal, selectedTable, clearSelectedTable } =
    useTableUtilStore();
  const { updateTable } = useTableDataStore();
  const { waiters } = useEmployeeDataStore();
  const [waiterId, setWaiterId] = useState("");
  const [error, setError] = useState("");

  const waiterOptions = waiters.map((el) => ({
    label: `${el.firstname} ${el.lastname}`,
    value: el.id,
  }));
  const options = [{ label: "", value: "" }, ...waiterOptions];
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
      <div className="p-5 w-[300px] bg-white rounded-xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Allocate Waiter
          </h2>
          <p className="text-sm text-gray-600">
            Assign a waiter to table{" "}
            <span className="font-medium text-gray-900">
              #{selectedTable?.tableNumber} ({selectedTable?.name})
            </span>
          </p>
        </div>
        {selectedTable?.waiter && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Currently assigned:</span>{" "}
              {selectedTable?.waiter.firstname} {selectedTable?.waiter.lastname}
            </p>
          </div>
        )}

        {/* Waiter Selection */}
        <div className="mb-3">
          <Field
            label="Select Waiter"
            type="select"
            onChange={(e) => setWaiterId(e.target.value)}
            options={options}
            placeholder="Choose a waiter..."
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={closeModal}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={isPending}
            className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
