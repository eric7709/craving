"use client";
import React from "react";

type Props = {
  isTakeout?: boolean; // ✅ boolean type
  onClick: () => void;
};

export default function OrderTypeButton({ isTakeout = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 z-30  duration-300 active:scale-90 cursor-pointer text-[13px] absolute top-2 right-2 rounded-full font-medium shadow transition
        ${isTakeout 
          ? "bg-blue-600 hover:bg-blue-700 text-white" 
          : "bg-gray-400 hover:bg-gray-700 text-white"
        }`}
    >
      {isTakeout ? "🛍️ Takeout" : "🍽️ Dine-in"}
    </button>
  );
}
