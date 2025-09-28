"use client";
import Modal from "@/global/components/Modal";
import { useTableUtilStore } from "../store/useTableUtilStore";
import { useDeallocateWaiter } from "../hooks/useTableServices";
import { useTableDataStore } from "../store/useTableDataStore";
import { Trash2 } from "lucide-react"; // icon for visual emphasis

export default function DeallocateWaiterModal() {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const { updateTable } = useTableDataStore();
  const { mutate, isPending, reset } = useDeallocateWaiter();

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
      <div className="w-64 p-6 h-fit rounded-xl bg-slate-800 shadow-lg text-center space-y-3">
        <p className="text-[13px] text-slate-300">
          Are you sure you want to deallocate
        </p>
        <p className="text-base font-semibold text-yellow-400">
          {selectedTable?.waiter?.firstname} from table #{selectedTable?.tableNumber} ({selectedTable?.name})?
        </p>

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
            onClick={handleConfirm}
            disabled={isPending}
            className={`w-20 h-9 rounded-lg text-xs text-white 
              ${isPending
                ? "bg-yellow-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-500 hover:scale-105"} 
              active:scale-95 cursor-pointer transition-transform duration-200 grid place-content-center`}
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Deallocate"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
