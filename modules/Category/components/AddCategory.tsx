"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useCreateCategory } from "../hooks/useCategoryServices";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import { CategoryDomain } from "../services/categoryDomain";
import { FaTimes } from "react-icons/fa";

export default function AddCategory() {
  const [isAdding, setIsAdding] = useState(false);
  const [value, setValue] = useState("");
  const { addCategory, categories } = useCategoryDataStore();
  const { mutate, isPending } = useCreateCategory();
  const [error, setError] = useState("");
  const handleAdd = () => {
    if (CategoryDomain.hasDuplicateCreate(value, categories)) {
      setError("Name already exists");
    }
    if (!value.trim()) return;
    mutate(value, {
      onSuccess: (data) => {
        addCategory(data);
        setIsAdding(false);
      },
    });
    setValue("");
  };

  return (
    <div>
      <div
        onClick={() => !isAdding && setIsAdding(true)}
        className={`group h-44 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
          isAdding
            ? "cursor-default hover:shadow-none"
            : "cursor-pointer hover:from-blue-100 hover:to-indigo-200 hover:border-blue-400 hover:shadow-md hover:scale-[1.01] active:scale-100"
        }`}
      >
        {isAdding ? (
          <div className="flex flex-col items-center gap-3 w-full px-4">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-0 focus:outline-none text-[13px] transition-colors"
              placeholder="Enter category name"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex gap-2 w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd();
                }}
                className="w-full h-9 rounded-lg bg-blue-600 text-xs text-white hover:bg-blue-500 hover:scale-105 active:scale-95 cursor-pointer transition-transform duration-200 grid place-content-center"
              >
                {isPending ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent border-r-transparent rounded-full animate-spin"></span>
                ) : ( 
                  "Add"
                )}
              </button>
              <div onClick={() => {
                setIsAdding(false)
              }} className="h-9 w-9 cursor-pointer active:scale-90  shrink-0 border-blue-500 rounded-full border-2 duration-300 grid place-content-center">
                <FaTimes />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-blue-500 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors">
                Add Category
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
