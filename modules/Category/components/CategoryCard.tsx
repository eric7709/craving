"use client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Check, X } from "lucide-react";
import { TCategory } from "../types/category";
import { useCategoryUtilStore } from "../store/useCategoryUtilStore";
import { useUpdateCategory } from "../hooks/useCategoryServices";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import { useQueryClient } from "@tanstack/react-query";

export default function CategoryCard(category: TCategory) {
  const { name, id } = category;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const { updateCategory } = useCategoryDataStore();
  const { setSelectedCategory, openDeleteModal } = useCategoryUtilStore();
  const { mutate } = useUpdateCategory();
  const queryClient = useQueryClient(); // ✅ hook at top level

  const handleSave = () => {
    if (isEditing && value === name) {
      setIsEditing(false);
      return;
    }
    const trimmedValue = value.trim();
    if (trimmedValue) {
      updateCategory({ name: trimmedValue, id: category.id });
      setValue(trimmedValue);
      setIsEditing(false);
      mutate(
        { id, name: trimmedValue },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            updateCategory(data);
          },
          onError: () => {
            updateCategory(category);
          },
        }
      );
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name);
    setIsEditing(false);
  };

  return (
    <div
      onClick={() => {
        !isEditing && setIsEditing(true);
        setSelectedCategory(category);
      }}
      className=" relative h-44 bg-blue-800 text-white p-5 rounded-2xl border-2 cursor-pointer overflow-hidden"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (category.id.startsWith("temp")) {
            alert("This item is still being added");
            return;
          }
          openDeleteModal();
          setSelectedCategory(category);
        }}
        className="h-7 w-7 duration-300 active:scale-90 hover:scale-105 cursor-pointer hover:text-red-500 ml-auto absolute top-2 right-2 rounded-full border-2 grid place-content-center"
      >
        <FaTrash className="text-sm" />
      </div>

      {/* Name / Input */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-full flex justify-center transition-all duration-300 ${
          isEditing ? "bottom-9" : "bottom-[72px]"
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col items-center gap-2 opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards] relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-2 py-1.5 rounded-lg text-white capitalize text-sm w-28 border border-gray-400 focus:outline-none focus:ring focus:ring-white"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex gap-2">
              {/* Save */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="w-9 h-9 grid place-content-center rounded-full transition bg-green-600 hover:bg-green-500 active:scale-90 cursor-pointer"
              >
                <Check size={16} className="text-white" />
              </button>

              {/* Cancel */}
              <button
                onClick={handleCancel}
                className="w-9 h-9 grid place-content-center rounded-full bg-red-600 hover:bg-red-500 active:scale-90 cursor-pointer transition"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center px-4 text-[15px] capitalize font-semibold opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]">
            {value}
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
