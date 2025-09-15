"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import MenuItemImage from "./MenuItemImage";
import { useCreateMenuItem } from "../hooks/useCreateMenuItem";
import Modal from "@/global/components/Modal";

export default function CreateMenuItemModal() {
  const {
    form,
    preview,
    errors,
    setField,
    toggleAvailability,
    handleFileChange,
    fileInputRef,
    categories,
    handleSubmit,
    errorClass,
    inputClass,
    closeModal,
    isOpen,
    isPending,
  } = useCreateMenuItem();
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="w-[350px] mx-auto bg-white rounded-xl shadow p-4 space-y-4 max-h-[90vh] min-h-[20rem] overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Create Menu Item
        </h2>
        <MenuItemImage
          preview={preview}
          onFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col relative">
            <label className="absolute -top-2 left-2 text-[10px] font-medium text-gray-500 bg-white px-1">
              Item Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputClass}
              placeholder="Enter the name of your menu item"
              required
            />
            {errors.name && <span className={errorClass}>{errors.name}</span>}
          </div>
          <div className="flex flex-col relative">
            <label className="absolute -top-2 left-2 text-[10px] font-medium text-gray-500 bg-white px-1">
              Price
            </label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => setField("price", e.target.value)}
              className={inputClass}
              placeholder="Price"
              required
            />
            {errors.price && <span className={errorClass}>{errors.price}</span>}
          </div>
          <div className="flex flex-col relative">
            <label className="absolute -top-2 left-2 text-[10px] font-medium text-gray-500 bg-white px-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              className={inputClass}
              placeholder="Description"
              rows={2}
            />
            {errors.description && (
              <span className={errorClass}>{errors.description}</span>
            )}
          </div>
          <div className="flex flex-col relative">
            <label className="absolute -top-2 left-2 text-[10px] font-medium text-gray-500 bg-white px-1">
              Category
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setField("categoryId", e.target.value)}
              className={`${inputClass} capitalize`}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option
                  value={category.id}
                  key={category.id}
                  className="capitalize"
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className={errorClass}>{errors.categoryId}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.span
                key={form.isAvailable ? "available" : "unavailable"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`text-sm font-medium ${
                  form.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {form.isAvailable ? "Available" : "Unavailable"}
              </motion.span>
            </AnimatePresence>
            <button
              type="button"
              onClick={toggleAvailability}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-150 cursor-pointer ${
                form.isAvailable
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } hover:scale-105`}
            >
              {form.isAvailable ? (
                <Check size={16} className="text-white" />
              ) : (
                <X size={16} className="text-white" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className={`w-full h-10 rounded-md text-white text-sm font-medium transition bg-blue-600 cursor-pointer hover:bg-blue-500 active:scale-90 flex items-center justify-center gap-2`}
          >
            {isPending && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
