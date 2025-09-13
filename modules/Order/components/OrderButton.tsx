"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderUtilStore } from "../store/useOrderUtilStore";

export default function OrderButton() {
  const { formattedTotal, selectedItems } = useOrderUtilStore();
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const { openOrderSummaryModal } = useOrderUtilStore();
  const hasItems = totalItems > 0;
  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="sticky bottom-3 flex justify-center px-3"
        >
          <div className="flex items-center justify-between w-full max-w-sm rounded-lg shadow-md bg-white border border-gray-200 px-3 py-2">
            {/* Total on the left */}
            <span className="text-[15px] font-semibold text-gray-00">
              Total: {formattedTotal()}
            </span>

            <button
              onClick={openOrderSummaryModal}
              className="px-4 py-2 duration-300 cursor-pointer bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold rounded-md shadow-sm transition-all"
            >
              Place Order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
