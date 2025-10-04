import { formatPrice } from "@/global/utils/formatPrice";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import { useOrderUtilStore } from "@/modules/Order/store/useOrderUtilStore";
import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Home } from "lucide-react";

type Props = {
  menuItem: TMenuItem;
};

export default function MenuCard({ menuItem }: Props) {
  const {
    getItemFromCart,
    existsInCart,
    removeFromCart,
    decreaseQuantity,
    addToCart,
    increaseQuantity,
    toggleTakeOut,
  } = useOrderUtilStore();

  const isSelected = existsInCart(menuItem.id);
  const selectedItem = getItemFromCart(menuItem.id);
  const isAvailable = menuItem.isAvailable;

  return (
    <div
      className={`flex gap-2 text-sm w-full rounded-3xl duration-300 shadow-md p-2 relative ${
        isSelected ? "border-blue-500 border-2" : "border-[1.5px] border-gray-300"
      } ${!isAvailable ? "bg-gray-100 pointer-events-none opacity-70" : "bg-white"}`}
    >
      {/* ✅ Image box with toggle */}
      <div
        className="h-24 w-24 shrink-0 border border-gray-300 rounded-3xl flex items-center justify-center relative"
      >
        {/* Show Home icon toggle */}
        {isSelected && (
          <button
            type="button"
            onClick={() => toggleTakeOut(menuItem.id)}
            className={`absolute top-2 left-2 p-1 rounded-full shadow transition ${
              selectedItem?.takeOut
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            <Home size={14} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="w-full flex flex-col justify-between">
        {/* Name + badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className={`text-[15px] font-semibold ${
              isAvailable ? "text-black" : "text-gray-400 line-through"
            }`}
          >
            {menuItem.name}
          </p>
          {/* {selectedItem?.takeOut && (
            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5">
              Take Home
            </span>
          )} */}
        </div>

        <p className="text-xs">
          <span className="text-gray-500">Price Per 1:</span>
          <span
            className={`font-medium ${
              isAvailable ? "text-black" : "text-gray-400"
            }`}
          >
            {" "}
            {formatPrice(menuItem.price)}
          </span>
        </p>

        {/* Remove icon */}
        <div
          onClick={() => removeFromCart(menuItem.id)}
          className={`absolute top-3 right-3 duration-300 cursor-pointer ${
            isSelected ? "opacity-100 visible" : "invisible opacity-0"
          }`}
        >
          <FaTrashAlt color="red" />
        </div>

        {/* Controls */}
        <div className="flex items-center w-full justify-between">
          {isSelected ? (
            <div className="flex gap-2 bg-gray-100 p-1 rounded-full shadow-md items-center">
              <div
                onClick={() => decreaseQuantity(menuItem.id)}
                className="h-7 w-7 duration-300 cursor-pointer active:scale-90 text-red-500 rounded-full bg-white grid place-content-center"
              >
                <FaMinus size={10} />
              </div>
              <div className="w-4 flex justify-center overflow-hidden h-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedItem?.quantity}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedItem?.quantity}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div
                onClick={() => increaseQuantity(menuItem.id)}
                className="h-7 w-7 duration-300 cursor-pointer active:scale-90 text-green-500 rounded-full bg-white grid place-content-center"
              >
                <FaPlus size={10} />
              </div>
            </div>
          ) : (
            <div
              onClick={() => addToCart(menuItem)}
              className={`h-8 w-8 rounded-full shadow-md grid place-content-center cursor-pointer active:scale-90 duration-300 ${
                isAvailable
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <FaPlus className="text-white" />
            </div>
          )}

          {/* Price */}
          <div className="overflow-hidden h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedItem ? selectedItem.quantity * menuItem.price : menuItem.price}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-bold ${
                  isAvailable ? "text-black" : "text-gray-400"
                }`}
              >
                {selectedItem
                  ? formatPrice(selectedItem.quantity * menuItem.price)
                  : formatPrice(menuItem.price)}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
