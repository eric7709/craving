"use client";
import { formatPrice } from "@/global/utils/formatPrice";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import { useOrderUtilStore } from "../store/useOrderUtilStore";
import OrderTypeButton from "./OrderTypeToggle";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Props = {
  menuItem: TMenuItem;
};

export default function MenuItemOrderCard({ menuItem }: Props) {
  const {
    getItemFromCart,
    existsInCart,
    removeFromCart,
    toggleTakeOut,
    decreaseQuantity,
    addToCart,
    increaseQuantity,
  } = useOrderUtilStore();

  const isSelected = existsInCart(menuItem.id);
  const selectedItem = getItemFromCart(menuItem.id);
  const isAvailable = menuItem.isAvailable;

  return (
    <div
      className={`relative duration-300 rounded-2xl p-2 transition ${
        isAvailable
          ? `shadow-md border-2 ${
              isSelected
                ? "bg-blue-50 border-blue-400"
                : "bg-white border-gray-200"
            }`
          : ""
      }`}
    >
      {!isAvailable && (
        <div className="inset-0 bg-gray-600/10 rounded-2xl grid place-content-center absolute z-30">
          <p className="text-red-600 font-semibold text-lg -rotate-[20deg]">
            Item Unavailable
          </p>
        </div>
      )}

      <div>
        <div className="h-44 w-full rounded-2xl relative">
          {isSelected && (
            <OrderTypeButton
              isTakeout={selectedItem?.takeOut}
              onClick={() => toggleTakeOut(menuItem.id)}
            />
          )}
          <Image
            alt="Menu item"
            src={menuItem.imageUrl || "/placeholder.jpg"} // fallback placeholder
            height={20}
            width={20}
            className="z-20 object-contain relative rounded-2xl h-full w-full"
          />{" "}
        </div>

        <div className="flex mt-2 flex-col gap-2">
          <div className="flex justify-between items-center">
            <p
              className={`text-lg font-semibold ${
                !isAvailable ? "text-gray-400" : "text-gray-900"
              }`}
            >
              {menuItem.name}
            </p>
            {isSelected && (
              <Trash2Icon
                onClick={() => removeFromCart(menuItem.id)}
                size={20}
                className="text-red-700 cursor-pointer"
              />
            )}
          </div>

          <p
            className={`text-[15px] ${
              !isAvailable ? "text-gray-400" : "text-gray-700"
            }`}
          >
            {menuItem.description}
          </p>

          <p
            className={`text-[15px] ${
              !isAvailable ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>Price per 1 : </span>
            <span
              className={`font-semibold ${
                !isAvailable ? "text-gray-500" : "text-gray-800"
              }`}
            >
              {formatPrice(menuItem.price)}
            </span>
          </p>

          {isSelected && (
            <div className="flex justify-between mt-1 items-center">
              <div className="flex p-1 items-center bg-gray-200 rounded-full">
                {/* Decrease */}
                <div
                  onClick={() => decreaseQuantity(menuItem.id)}
                  className="h-9 w-9 grid place-content-center shadow-lg rounded-full bg-white active:scale-90 transition duration-200 cursor-pointer"
                >
                  <Minus size={15} />
                </div>

                <div className="w-12  flex justify-center">
                  {/* Animated Quantity */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedItem?.quantity}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[15px] font-semibold"
                    >
                      {selectedItem?.quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Increase */}
                <div
                  onClick={() => increaseQuantity(menuItem.id)}
                  className="h-9 w-9 shadow-lg rounded-full grid place-content-center bg-white active:scale-90 transition duration-200 cursor-pointer"
                >
                  <Plus size={15} />
                </div>
              </div>

              {/* Animated Total */}
              {selectedItem && (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedItem.quantity * selectedItem.price}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-lg font-semibold"
                  >
                    {formatPrice(selectedItem.quantity * selectedItem.price)}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
          )}

          {!isSelected && isAvailable && (
            <div className="grid place-content-center">
              <div
                onClick={() => addToCart(menuItem)}
                className="h-10 w-10 shadow-md text-white rounded-full cursor-pointer bg-blue-600 grid place-content-center duration-300 active:scale-90"
              >
                <Plus />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
