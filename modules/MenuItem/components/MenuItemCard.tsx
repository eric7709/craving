"use client";
import { useUpdateMenuAvailability } from "../hooks/useMenuItemServices";
import { useMenuItemUtilStore } from "../store/useMenuItemUtilStore";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { formatPrice } from "@/global/utils/formatPrice";
import { TMenuItem } from "../types/menuItem";
export default function MenuItemCard(menuItem: TMenuItem) {
  const { openUpdateModal, openDeleteModal, setSelectedMenuItem } =
    useMenuItemUtilStore();
  const { mutate, isPending } = useUpdateMenuAvailability();
  const { updateMenuItem } = useMenuItemDataStore();
  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (menuItem) {
      mutate(
        { id: menuItem.id, isAvailable: !menuItem.isAvailable },
        {
          onSuccess: (updatedItem) => {
            updateMenuItem(updatedItem);
          },
          onError: (err) => {
            console.error("❌ Update failed:", err);
          },
        }
      );
    }
  };
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMenuItem(menuItem);
    openDeleteModal();
  };
  const handleCardClick = () => {
    setSelectedMenuItem(menuItem);
    openUpdateModal();
  };
  return (
    <div
      onClick={handleCardClick}
      className="select-none cursor-pointer flex flex-col justify-between p-3 relative h-48 bg-blue-950 text-white rounded-2xl border-2"
    >
      <div className="flex justify-between w-full items-center">
        <div
          onClick={handleDeleteClick}
          className="h-7 w-7 duration-300 active:scale-90 hover:scale-105 cursor-pointer hover:text-red-500 rounded-full border-2 grid place-content-center"
        >
          <FaTrash className="text-sm" />
        </div>
        <div
          onClick={handleStatusToggle}
          className={`h-7 w-7 duration-300 active:scale-90 hover:scale-105 cursor-pointer ${
            menuItem.isAvailable ? "hover:text-red-500" : "hover:text-green-500"
          }  rounded-full border-2 grid place-content-center`}
        >
          {isPending ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent border-r-transparent rounded-full animate-spin" />
          ) : !menuItem.isAvailable ? (
            <FaEyeSlash />
          ) : (
            <FaEye className="text-sm" />
          )}
        </div>
      </div>
      <div>
        <p className="text-center text-base capitalize font-semibold">
          {menuItem.name}
        </p>
        <p className="text-center text-xs italic capitalize">
          {menuItem.category.name}
        </p>
      </div>
      <p className="text-center text-[17px] text-green-500 font-semibold">
        {formatPrice(menuItem.price)}
      </p>
    </div>
  );
}
