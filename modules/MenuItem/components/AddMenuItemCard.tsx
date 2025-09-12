"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useMenuItemUtilStore } from "../store/useMenuItemUtilStore";

export default function AddMenuItemCard() {
  const { openCreateModal } = useMenuItemUtilStore();

  return (
    <div
      onClick={openCreateModal}
      className="group h-48 bg-gradient-to-br from-green-50 to-emerald-100 
                 hover:from-green-100 hover:to-emerald-200 
                 border-2 border-dashed border-green-300 hover:border-green-400 
                 rounded-xl cursor-pointer transition-all duration-300 
                 flex flex-col items-center justify-center gap-3 
                 hover:shadow-md hover:scale-[1.01] active:scale-100"
    >
      <div
        className="w-12 h-12 bg-green-500 group-hover:bg-green-600 rounded-full 
                      flex items-center justify-center transition-colors duration-300"
      >
        <Plus className="w-6 h-6 text-white" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-green-700 group-hover:text-green-800 transition-colors">
          Add Menu Item
        </h3>
        <p className="text-sm text-green-600 group-hover:text-green-700 transition-colors">
          Create a new menu item
        </p>
      </div>
    </div>
  );
}
