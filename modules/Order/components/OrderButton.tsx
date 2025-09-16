"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useOrderUtilStore } from "../store/useOrderUtilStore";

export default function OrderButton() {
  const { formattedTotal, selectedItems, openOrderSummaryModal } =
    useOrderUtilStore();

  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const hasItems = totalItems > 0;

  return (
    <AnimatePresence>
      {hasItems && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="sticky bottom-3 z-40 flex justify-center px-3"
        >
          <div className="flex items-center  border-2 border-gray-100 justify-between w-full max-w-sm rounded-lg shadow-md bg-white  px-3 py-2">
            {/* Animated total */}
            <span className="text-lg font-semibold text-gray-800 flex items-center gap-1">
              <span className="relative inline-block h-[20px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={formattedTotal()} // re-mounts when total changes
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="block"
                  >
                    {formattedTotal()}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>

            <button
              onClick={openOrderSummaryModal}
              className="px-4 py-2 duration-300 cursor-pointer bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold rounded-full shadow-md transition-all"
            >
              Place Order
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
