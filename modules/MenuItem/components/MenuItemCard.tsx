"use client";
import { useUpdateMenuAvailability } from "../hooks/useMenuItemServices";
import { useMenuItemUtilStore } from "../store/useMenuItemUtilStore";
import { useMenuItemDataStore } from "../store/useMenuItemDataStore";
import { FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { formatPrice } from "@/global/utils/formatPrice";
import { TMenuItem } from "../types/menuItem";

export default function MenuItemCard({ menuItem }: { menuItem: TMenuItem }) {
  const { openUpdateModal, openDeleteModal, setSelectedMenuItem } =
    useMenuItemUtilStore();
  const { mutate } = useUpdateMenuAvailability();
  const { updateMenuItem } = useMenuItemDataStore();

  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!menuItem) return;

    // optimistic update
    const optimistic = { ...menuItem, isAvailable: !menuItem.isAvailable };
    updateMenuItem(optimistic);

    mutate(
      { id: menuItem.id, isAvailable: optimistic.isAvailable },
      {
        onSuccess: (updatedItem) => {
          updateMenuItem(updatedItem);
        },
        onError: (err) => {
          // rollback
          updateMenuItem(menuItem);
        },
      }
    );
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (menuItem.id.startsWith("temp")) {
      alert("Sorry, this menu item is still being created.");
      return;
    }

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
      className="select-none cursor-pointer flex flex-col justify-between p-3 relative h-48 text-white rounded-2xl border-2 group overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        background: "linear-gradient(135deg, #6366f1 0%, #1e1b4b 100%)",
        boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)",
        transform: "translateZ(0)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateZ(0) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.4), 0 0 0 2px rgba(139, 92, 246, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateZ(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)";
      }}
    >
      {/* Animated gradient overlay - always animating */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite"
        }}
      />

      {/* Floating particles effect - always animating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-60"
          style={{
            top: "20%",
            left: "15%",
            animation: "float 3s ease-in-out infinite",
            animationDelay: "0s"
          }}
        />
        <div 
          className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-40"
          style={{
            top: "60%",
            right: "20%",
            animation: "float 4s ease-in-out infinite",
            animationDelay: "1s"
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-50"
          style={{
            bottom: "30%",
            left: "70%",
            animation: "float 3.5s ease-in-out infinite",
            animationDelay: "0.5s"
          }}
        />
      </div>

      <div 
        className="flex justify-between w-full items-center relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        <div
          onClick={handleDeleteClick}
          className="h-7 w-7 duration-300 active:scale-90 hover:scale-110 cursor-pointer hover:text-red-400 hover:rotate-12 rounded-full border-2 border-white/30 backdrop-blur-sm grid place-content-center transition-all shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <FaTrash className="text-sm" />
        </div>
        <div
          onClick={handleStatusToggle}
          className={`h-7 w-7 duration-300 active:scale-90 hover:scale-110 cursor-pointer ${
            menuItem.isAvailable ? "hover:text-red-400" : "hover:text-green-400"
          } hover:rotate-12 rounded-full border-2 border-white/30 backdrop-blur-sm grid place-content-center transition-all shadow-lg`}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
          }}
        >
          {menuItem.isAvailable ? (
            <FaEye className="text-sm" />
          ) : (
            <FaEyeSlash />
          )}
        </div>
      </div>

      <div 
        className="relative z-10"
        style={{ transform: "translateZ(25px)" }}
      >
        <p className="text-center text-[15px] lg:text-base capitalize font-semibold drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
          {menuItem.name}
        </p>
        <p className="text-center text-xs italic capitalize text-purple-200 drop-shadow-md">
          {menuItem.category.name}
        </p>
      </div>

      <p 
        className="text-center text-base lg:text-[17px] text-emerald-400 font-semibold drop-shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        {formatPrice(menuItem.price)}
      </p>

      {/* Bottom glow effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: "translateZ(35px)" }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}