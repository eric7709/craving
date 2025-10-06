"use client";
import { useOrderUtilStore } from "../store/useOrderUtilStore";
import { FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderButton() {
  
  const { openOrderSummaryModal, formattedTotal, total } = useOrderUtilStore();

  const totalValue = total();

  return (
    <div
      className={`sticky bottom-0 left-0 w-full bg-white border-t duration-300 ${
        totalValue > 0 ? "opacity-100 visible p-3" : "opacity-0 invisible h-0"
      }`}
    >
      <button
        onClick={openOrderSummaryModal}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-95 duration-200 shadow-md text-white text-sm font-medium"
      >
        <span className="flex items-center gap-2">
          <FaShoppingCart size={14} />
          Place Order
        </span>

        {/* ✅ Animated total */}
        <AnimatePresence mode="wait">
          <motion.span
            key={totalValue}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="text-sm font-semibold bg-white text-green-600 px-2.5 py-1 rounded-lg shadow-sm"
          >
            {formattedTotal()}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
