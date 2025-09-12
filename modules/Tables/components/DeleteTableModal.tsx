import { useTableUtilStore } from "../store/useTableUtilStore";
import Modal from "@/global/components/Modal";
import { Trash2, Loader2 } from "lucide-react";
import { useDeleteTable } from "../hooks/useTableServices";
import { useTableDataStore } from "../store/useTableDataStore";

export default function DeleteTableModal() {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const {removeTable} = useTableDataStore()
  const { mutate, isPending } = useDeleteTable();
  const handleDelete = () => {
    if (!selectedTable) return;
    mutate(selectedTable.id, {
      onSuccess: () => {
        removeTable(selectedTable.id)
        closeModal();
      },
    });
  };
  return (
    <Modal isOpen={activeModal === "delete"} onClose={closeModal}>
      <div className="p-4 flex rounded-xl bg-white w-[275px] flex-col items-center text-center space-y-3">
        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
          <Trash2 className="text-red-600" size={22} />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Delete Table {selectedTable?.tableNumber}?
        </h2>

        <p className="text-sm text-gray-500">
          You are about to delete{" "}
          <span className="font-medium text-gray-600">{selectedTable?.name}</span>. This action
          cannot be undone.
        </p>

        <div className="flex gap-2 mt-3 w-full">
          <button
            onClick={closeModal}
            disabled={isPending}
            className="flex-1 px-3 py-2 cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 px-3 py-2 cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-1" size={16} />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
