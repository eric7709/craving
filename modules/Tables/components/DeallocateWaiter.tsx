"use client";
import Modal from "@/global/components/Modal";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { useDeallocateWaiter } from "../hooks/useTableServices";
import { useTableDataStore } from "../store/useTableDataStore";

export default function DeallocateWaiter() {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const { updateTable } = useTableDataStore();
  const { mutate, isPending, reset } =
    useDeallocateWaiter();
  const handleConfirm = () => {
    if (!selectedTable) return;
    mutate(selectedTable.id, {
      onSuccess: (data) => {
        if (data) updateTable(data);
        closeModal();
        reset();
      },
    });
  };
  return (
    <Modal isOpen={activeModal === "deallocate"} onClose={closeModal}>
      <div className="p-6 w-[275px] bg-white rounded-xl mx-auto text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Deallocate Waiter
        </h2>
        <p className="text-xs leading-relaxed text-gray-700 mb-6">
          Are you sure you want to deallocate{" "}
          <b>
            {selectedTable?.waiter?.firstname} {selectedTable?.waiter?.lastname}
          </b>{" "}
          from table{" "}
          <b>
            #{selectedTable?.tableNumber} ({selectedTable?.name})
          </b>
          ?
        </p>
        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition ${
              isPending
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isPending ? "Deallocating..." : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
