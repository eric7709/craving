"use client";
import { formatPrice } from "@/global/utils/formatPrice";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { TMenuItem } from "@/modules/MenuItem/types/menuItem";
import { useOrderUtilStore } from "../store/useOrderUtilStore";

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
      className={`relative shadow-sm rounded-lg p-3 mb-2
        transition-colors duration-300 ease-in-out
        ${
          isSelected
            ? "border-2 border-red-500 bg-white"
            : "border border-gray-200 bg-amber-50"
        }
        ${!isAvailable ? "opacity-60" : ""}
      `}
    >
      {/* Unavailable badge */}
      {!isAvailable && (
        <span className="absolute top-3 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          Unavailable
        </span>
      )}

      {/* Top row: name + trash */}
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p
            className={`font-semibold text-sm truncate transition-colors duration-300 ${
              isSelected ? "text-blue-700" : ""
            }`}
          >
            {menuItem.name}
          </p>
          <p
            className={`text-xs font-semibold mt-1.5 transition-colors duration-300 ${
              isSelected ? "text-blue-600" : ""
            }`}
          >
            {formatPrice(menuItem.price)}
          </p>
        </div>
        {isSelected && isAvailable && (
          <button
            onClick={() => removeFromCart(menuItem.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 rounded-full cursor-pointer active:scale-90 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Description */}
      <p
        className={`mt-2 text-[13px] leading-snug transition-colors duration-300 ${
          isAvailable ? "text-black" : "text-gray-400"
        }`}
      >
        {menuItem.description}
      </p>

      {/* Quantity & Takeout Controls */}
      {selectedItem ? (
        <div className="flex items-center justify-between mt-2">
          {/* Takeout toggle */}
          <button
            onClick={() => toggleTakeOut(menuItem.id)}
            disabled={!isAvailable}
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border duration-300 active:scale-90
              ${
                selectedItem.takeOut
                  ? "bg-yellow-100 text-red-700 border-yellow-300"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }
              ${
                !isAvailable
                  ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }
               ease-in-out
            `}
          >
            <ShoppingBag className="w-3 h-3" />
            {selectedItem.takeOut ? "Takeout" : "Dine-in"}
          </button>

          {/* Quantity controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => decreaseQuantity(menuItem.id)}
              disabled={!isAvailable}
              className={`w-6 h-6 flex items-center justify-center rounded-full duration-300
                ${
                  isAvailable
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-gray-200 cursor-not-allowed"
                }
              `}
            >
              <Minus
                className={`w-3 h-3 ${
                  isAvailable ? "text-gray-700" : "text-gray-400"
                }`}
              />
            </button>
            <span
              className={`w-5 text-center text-sm font-medium transition-colors duration-300 ${
                isAvailable ? "text-blue-600" : "text-gray-400"
              }`}
            >
              {selectedItem.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(menuItem.id)}
              disabled={!isAvailable}
              className={`w-6 h-6 flex items-center justify-center rounded-full duration-300
                ${
                  isAvailable
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-gray-200 cursor-not-allowed"
                }
              `}
            >
              <Plus
                className={`w-3 h-3 ${
                  isAvailable ? "text-gray-700" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-2">
          <button
            onClick={() => addToCart(menuItem)}
            disabled={!isAvailable}
            className={`w-8 h-8 flex items-center justify-center rounded-full shadow-md transition-all duration-300
              ${
                isAvailable
                  ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer active:scale-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
