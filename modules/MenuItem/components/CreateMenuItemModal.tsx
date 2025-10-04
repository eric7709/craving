"use client";
import { useCreateMenuItem } from "../hooks/useCreateMenuItem";
import Modal from "@/global/components/Modal";
import MenuItemImage from "./MenuItemImage";
import { FaCheck, FaTimes, FaTag, FaDollarSign, FaInfoCircle } from "react-icons/fa";

export default function CreateMenuItemModal() {
  const {
    form,
    preview,
    errors,
    setField,
    handleFileChange,
    fileInputRef,
    categories,
    handleSubmit,
    closeModal,
    isOpen,
    isPending,
  } = useCreateMenuItem();

  const labelClass = "text-xs font-medium text-gray-700 mb-1 flex items-center gap-1 ml-0.5";

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <form
        onSubmit={handleSubmit}
        className="w-[325px] border-2 border-gray-200 rounded-3xl shadow-md bg-gray-50 flex flex-col h-[80vh]"
      >
        <h2 className="text-base text-center px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">
          Create Menu Item
        </h2>

        <div className="px-4 py-4 space-y-4 overflow-y-auto">
          {/* Image */}
          <MenuItemImage
            preview={preview}
            onFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          {/* Item Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className={labelClass}>
              <FaTag className="text-blue-500" /> Item Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Enter the name of your menu item"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
              required
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className={labelClass}>
              <FaDollarSign className="text-green-500" /> Price
            </label>
            <input
              id="price"
              type="number"
              value={form.price ?? ""}
              onChange={(e) => setField("price", e.target.value)}
              placeholder="Price"
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
              required
            />
            {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className={labelClass}>
              <FaInfoCircle className="text-yellow-500" /> Description
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Description"
              rows={2}
              className="h-20 text-xs p-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400 resize-none"
            />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className={labelClass}>
              <FaTag className="text-purple-500" /> Category
            </label>
            <select
              id="category"
              value={form.categoryId}
              onChange={(e) => setField("categoryId", e.target.value)}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400 capitalize"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} className="capitalize">
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-red-600 mt-1">{errors.categoryId}</p>}
          </div>

          {/* Availability */}
          <div className="flex flex-col">
            <label htmlFor="isAvailable" className={labelClass}>
              <FaCheck className="text-green-500" /> Availability
            </label>
            <select
              id="isAvailable"
              value={form.isAvailable ? "true" : "false"}
              onChange={(e) => setField("isAvailable", e.target.value === "true")}
              className="h-9 text-xs pl-3 focus:border-blue-500 duration-300 px-2 border-[1.5px] outline-none rounded-[10px] border-gray-200 focus:ring-blue-400"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            {errors.isAvailable && <p className="text-xs text-red-600 mt-1">{errors.isAvailable}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex p-3 border-t bg-white m-2 border rounded-2xl border-gray-200 justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className={`px-5 py-2.5 active:scale-90 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium transition duration-300 ${
              isPending
                ? "bg-gray-400 cursor-not-allowed text-gray-700"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`px-5 py-2.5 active:scale-90 cursor-pointer rounded-[10px] shadow-sm shadow-gray-600 text-xs font-medium text-white transition duration-300 ${
              isPending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
