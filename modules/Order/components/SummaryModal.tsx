import { formatPrice } from "@/global/utils/formatPrice";
import { FaTrash, FaShoppingCart, FaHome } from "react-icons/fa";
import { TMenuItemsWithQtyAndTakeOut } from "../types/order";
import Modal from "@/global/components/Modal";

type Props = {
  selectedItems: TMenuItemsWithQtyAndTakeOut[];
  unavailableItems: string[];
  removeFromCart: (el: string) => void;
  handleClose: () => void;
  formattedTotal: () => string;
  setUnavailableItems: (el: string[]) => void;
  handleConfirm: () => Promise<void>;
  isPending: boolean;
  isLoading: boolean;
  isSummaryModalOpen: () => boolean;
};

export default function SummaryModal({
  removeFromCart,
  selectedItems,
  setUnavailableItems,
  isLoading,
  isPending,
  isSummaryModalOpen,
  formattedTotal,
  handleConfirm,
  unavailableItems,
  handleClose,
}: Props) {
  return (
    <Modal isOpen={isSummaryModalOpen()} onClose={handleClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
        className="w-[340px] border-2 border-gray-200 rounded-3xl shadow-md bg-gray-50 flex flex-col"
      >
        {/* ✅ Header */}
        <h2 className="text-base px-4 py-3 text-center border-b border-gray-200 font-semibold text-gray-900 flex items-center justify-center gap-2">
          <FaShoppingCart className="text-blue-500" /> Order Summary
        </h2>

        {/* Items Section */}
        <div className="px-4 py-4 max-h-[50vh] overflow-y-auto space-y-2">
          {unavailableItems.length > 0 && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs text-center font-medium">
              Some items are unavailable
            </div>
          )}

          {selectedItems.map((item) => {
            const isUnavailable = unavailableItems.includes(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-2 rounded-lg border ${
                  isUnavailable
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* ✅ Quantity first */}
                  <span className="text-sm font-bold text-gray-900">
                    ×{item.quantity}
                  </span>
                  <span className="text-xs font-medium text-gray-700 capitalize truncate">
                    {item.name}
                  </span>
                  {/* 🏠 Home stays here */}
                  {item.takeOut && (
                    <FaHome
                      className="text-blue-500 text-xs"
                      title="Take Home"
                    />
                  )}
                  {isUnavailable && (
                    <span className="ml-2 text-red-600 font-medium text-xs">
                      Unavailable
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item.id);
                      setUnavailableItems([]);
                    }}
                    className="p-1 text-red-500 hover:text-red-700 rounded-full"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Section */}
        <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center text-sm font-medium">
          <span>Total:</span>
          <span className="text-base font-bold text-gray-900">
            {formattedTotal()}
          </span>
        </div>

        {/* ✅ Buttons */}
        <div className="flex p-3 border-t bg-white m-2 border rounded-2xl border-gray-200 justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className={`px-5 py-2.5 shadow-sm shadow-gray-600 cursor-pointer rounded-[10px] text-xs font-medium transition duration-300 ${
              isLoading || isPending
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || isPending}
            className={`px-6 py-2.5 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium text-white transition duration-300 ${
              isLoading || isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading || isPending ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
