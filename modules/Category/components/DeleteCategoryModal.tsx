"use client";
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useCategoryUtilStore } from "../store/useCategoryUtilStore";
import { useDeleteCategory } from "../hooks/useCategoryServices";
import { useCategoryDataStore } from "../store/useCategoryDataStore";
import Modal from "@/global/components/Modal";

export default function DeleteCategoryModal() {
  const { selectedCategory, activeModal, closeModal, clearSelectedCategory } = useCategoryUtilStore();
  const { mutate, isPending, isSuccess } = useDeleteCategory();
  const { deleteCategory } = useCategoryDataStore();

  const handleDelete = () => {
    if (selectedCategory?.id) {
      mutate(selectedCategory.id);
    }
  };

  useEffect(() => {
    if (isSuccess && selectedCategory) {
      deleteCategory(selectedCategory.id);
      closeModal();
      clearSelectedCategory()
    }
  }, [isSuccess, isPending]);

  return (
    <Modal isOpen={activeModal == "delete"} onClose={closeModal}>
      <div className="w-56 p-6 h-fit rounded-xl bg-slate-800 shadow-lg text-center space-y-3">
        <Trash2 className="w-8 h-8 text-red-500 mx-auto" />
        <p className="text-[13px] text-slate-300">
          Are you sure you want to delete this Category?
        </p>
        <p className="text-base capitalize font-semibold text-red-400">
          {selectedCategory?.name || "Category"}
        </p>

        <div className="flex justify-center gap-2 pt-1">
          <button
            onClick={closeModal}
            className="w-20 h-9 rounded-lg bg-slate-700 text-xs text-slate-200 
          hover:bg-slate-600 hover:scale-105 active:scale-95 
          cursor-pointer transition-transform duration-200 
          grid place-content-center"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className={`w-20 h-9 rounded-lg text-xs text-white 
            ${
              isPending
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-500 hover:scale-105"
            } 
            active:scale-95 cursor-pointer transition-transform duration-200 grid place-content-center`}
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
